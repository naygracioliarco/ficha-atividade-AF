import jsPDF from 'jspdf';
import { Question, UserAnswers } from '../types/questions';
import DownloadButton from './DownloadButton';

interface DownloadQuestionsButtonProps {
  questions: Question[];
  userAnswers: UserAnswers;
  title?: string;
  fileName?: string;
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
}

function DownloadQuestionsButton({
  questions,
  userAnswers,
  title = 'Ficha de Atividades',
  fileName = 'ficha-de-atividades.pdf',
}: DownloadQuestionsButtonProps) {
  const handleDownload = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    const ensureSpace = (needed: number) => {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const writeText = (
      text: string,
      { size = 10, style = 'normal', indent = 0, gap = 4 }: { size?: number; style?: 'normal' | 'bold'; indent?: number; gap?: number } = {}
    ) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', style);
      const lines = doc.splitTextToSize(text, maxWidth - indent);
      ensureSpace(lines.length * (size * 0.42) + gap);
      doc.text(lines, margin + indent, y);
      y += lines.length * (size * 0.42) + gap;
    };

    const answer = (id: string) => {
      const v = userAnswers[id];
      return v === undefined || v === '' ? '' : String(v);
    };

    // Título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, margin, y);
    y += 6;
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    questions.forEach((question) => {
      ensureSpace(20);
      const number = 'number' in question && question.number !== undefined ? `${question.number}. ` : '';
      writeText(`${number}${stripHtml(question.question || '')}`, { size: 12, style: 'bold', gap: 3 });

      switch (question.type) {
        case 'text-input': {
          if (question.subQuestions?.length) {
            question.subQuestions.forEach((sub) => {
              writeText(`${sub.letter}) ${stripHtml(sub.question)}`, { size: 11, style: 'bold', indent: 5, gap: 2 });
              const a = answer(`${question.id}_${sub.letter}`);
              writeText(`Resposta: ${a || '(não respondida)'}`, { indent: 10 });
            });
          } else {
            const a = answer(question.id);
            writeText(`Resposta: ${a || '(não respondida)'}`, { indent: 5 });
          }
          break;
        }
        case 'alternative': {
          const idx = userAnswers[question.id];
          const a = typeof idx === 'number' && question.options[idx] ? question.options[idx] : '';
          writeText(`Resposta: ${a || '(não respondida)'}`, { indent: 5 });
          break;
        }
        case 'multiple-choice': {
          const key = userAnswers[question.id] as 'a' | 'b' | 'c' | 'd' | undefined;
          const a =
            key && question.options[key]
              ? `${key.toUpperCase()}) ${stripHtml(question.options[key] ?? '')}`
              : '';
          writeText(`Resposta: ${a || '(não respondida)'}`, { indent: 5 });
          break;
        }
        case 'true-false': {
          question.statements?.forEach((st) => {
            writeText(`${st.letter}) ${stripHtml(st.statement)}`, { size: 11, indent: 5, gap: 2 });
            const v = userAnswers[`${question.id}_${st.letter}`] as boolean | undefined;
            writeText(`Resposta: ${v === undefined ? '(não respondida)' : v ? 'Verdadeiro (V)' : 'Falso (F)'}`, { indent: 10 });
          });
          if (question.hasCorrectionBox) {
            writeText(`Correção: ${answer(`${question.id}_correction`) || '(não preenchida)'}`, { indent: 5 });
          }
          break;
        }
        case 'fill-blanks': {
          question.items.forEach((item) => {
            const parts = item.fragments.map((frag, i) => {
              if (i === item.fragments.length - 1) return frag;
              return frag + `[${answer(`${question.id}_${item.letter}_${i}`) || '____'}]`;
            });
            writeText(`${item.letter}) ${parts.join('')}`, { indent: 5 });
          });
          break;
        }
        case 'ordering': {
          const ordered = [...question.items]
            .map((it) => ({ it, pos: userAnswers[`${question.id}_${it.id}`] as number | undefined }))
            .sort((a, b) => (a.pos ?? 99) - (b.pos ?? 99));
          ordered.forEach((o, i) => writeText(`${i + 1}. ${stripHtml(o.it.text)}`, { indent: 5, gap: 2 }));
          break;
        }
        case 'word-paint': {
          const painted = question.words
            .map((w, i) => ({ w, c: answer(`${question.id}_${i}`) }))
            .filter((x) => x.c);
          if (painted.length) {
            writeText(`Marcadas: ${painted.map((x) => x.w).join(', ')}`, { indent: 5 });
          } else {
            writeText('Resposta: (nenhuma palavra marcada)', { indent: 5 });
          }
          break;
        }
        case 'matching': {
          question.left.forEach((l) => {
            const chosenId = answer(`${question.id}_${l.id}`);
            const chosen = question.right.find((r) => r.id === chosenId)?.label || '(não ligado)';
            const leftLabel = l.label || l.icon || l.id;
            writeText(`${leftLabel} -> ${chosen}`, { indent: 5, gap: 2 });
          });
          break;
        }
        case 'image-word-complete': {
          const words = question.items
            .map((it) => `${answer(`${question.id}_${it.id}`) || '_'}${it.rest}`)
            .join(', ');
          writeText(`Palavras: ${words}`, { indent: 5 });
          question.subQuestions?.forEach((sub) => {
            writeText(`${sub.letter}) ${stripHtml(sub.question)}`, { size: 11, style: 'bold', indent: 5, gap: 2 });
            writeText(`Resposta: ${answer(`${question.id}_${sub.letter}`) || '(não respondida)'}`, { indent: 10 });
          });
          break;
        }
        case 'alphabet-trail': {
          const filled = question.blanks.map((b) => `${b}=${answer(`${question.id}_${b}`) || '_'}`).join('  ');
          writeText(`Letras preenchidas: ${filled}`, { indent: 5 });
          break;
        }
        case 'icon-describe': {
          question.items.forEach((item) => {
            const a = answer(`${question.id}_${item.id}`);
            writeText(`${item.icon || '•'} ${a || '(não respondida)'}`, { indent: 5, gap: 2 });
          });
          break;
        }
        case 'table-fill': {
          question.rows.forEach((row) => {
            const label = (row.paragraph as string) || '';
            const cells = question.columns
              .slice(1)
              .map((_, ci) => answer(`${question.id}_${row.id}_col${ci + 1}`))
              .filter(Boolean)
              .join(' | ');
            writeText(`${label ? label + ': ' : ''}${cells || '(não respondida)'}`, { indent: 5, gap: 2 });
          });
          break;
        }
        case 'quadrinha': {
          const painted = question.verses
            .map((v, vi) => ({ v, c: answer(`${question.id}_v${vi}`) }))
            .filter((x) => x.c);
          writeText(`Versos pintados: ${painted.length ? painted.length : 0}`, { indent: 5, gap: 2 });
          const circled: string[] = [];
          question.verses.forEach((v, vi) => {
            v.split(' ').forEach((word, wi) => {
              if (answer(`${question.id}_c${vi}_${wi}`) === '1') circled.push(word);
            });
          });
          writeText(
            `Palavras circuladas: ${circled.length ? circled.join(', ') : '(nenhuma)'}`,
            { indent: 5 }
          );
          break;
        }
        case 'drawing': {
          const dataUrl = answer(question.id);
          if (dataUrl && dataUrl.startsWith('data:image')) {
            const imgW = 70;
            const imgH = imgW * ((question.height ?? 220) / 420);
            ensureSpace(imgH + 4);
            try {
              doc.addImage(dataUrl, 'PNG', margin + 5, y, imgW, imgH);
            } catch {
              /* ignora imagem inválida */
            }
            y += imgH + 4;
          } else {
            writeText('Desenho: (em branco)', { indent: 5 });
          }
          break;
        }
      }

      y += 4;
    });

    doc.save(fileName);
  };

  return <DownloadButton onClick={handleDownload} />;
}

export default DownloadQuestionsButton;
