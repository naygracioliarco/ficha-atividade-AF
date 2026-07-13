function MathHeader() {
  return (
    <header
      className="relative w-full min-w-0 py-8 px-8 text-white"
      style={{
        background: 'linear-gradient(135deg, #C94A66 0%, #E85A7A 55%, #F07A90 100%)',
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col" style={{ marginLeft: '90px' }}>
            <p
              className="font-inter rounded-[20px]"
              style={{
                backgroundColor: '#FFE0E8',
                color: '#C94A66',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '30px',
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
              <span style={{ color: '#FFE082' }}>2.</span> Matemática
            </h1>
            <p className="font-inter" style={{ fontSize: '16px', fontWeight: 500, marginLeft: '2px' }}>
              6º ano · Volume 1 · Capítulo 1
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MathHeader;
