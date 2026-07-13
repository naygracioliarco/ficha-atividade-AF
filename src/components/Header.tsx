import { publicUrl } from '../lib/publicUrl';

function Header() {
  return (
    <header
      className="relative w-full min-w-0 bg-[#80298F] bg-no-repeat py-8 px-8 text-white"
      style={{
        backgroundImage: `url('${publicUrl('images/Capa-1.svg')}')`,
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
      }}
    >
      {/* Conteúdo do header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col" style={{ marginLeft: '90px' }}>
            <p
              className="font-inter rounded-[20px]"
              style={{
                backgroundColor: '#F4C2FF',
                color: '#80298F',
                textAlign: 'center',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '30px', /* 428.571% */
                letterSpacing: '-0.5px',
                width: '200px',
                height: '27px',
              }}
            >
              FICHA DE ATIVIDADES
            </p>
            <h1
              className="font-inter font-bold"
              style={{
                fontWeight: 900,
                fontSize: '40px',
              }}
            >
              <span style={{ color: '#FBB733' }}>1.</span> Língua Portuguesa
            </h1>
            <p className="font-inter" style={{ fontSize: '16px', fontWeight: 500, marginLeft: '2px' }}>
              6º ano · Volume 1 · Capítulo 1
            </p>

          </div>
        </div>
      </div>
    </header >
  );
}

export default Header;

