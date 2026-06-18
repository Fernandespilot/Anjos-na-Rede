
export function LogoPoliciaMillitar() {
  return (
    <svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" width="72" height="80" role="img" aria-label="Polícia Militar de Mato Grosso">
      {/* Shield */}
      <path d="M50 8 L82 18 L82 52 C82 72 50 88 50 88 C50 88 18 72 18 52 L18 18 Z" fill="#2D5A1B" stroke="#C8A000" strokeWidth="1.5"/>
      {/* Quadrants */}
      <path d="M50 8 L82 18 L82 52 L50 52 Z" fill="#2D5A1B"/>
      <path d="M50 52 L82 52 C82 72 50 88 50 88 Z" fill="#F5D000"/>
      <path d="M18 18 L50 18 L50 52 L18 52 Z" fill="#1a1a1a"/>
      <path d="M18 52 L50 52 L50 88 C50 88 18 72 18 52 Z" fill="#2D5A1B"/>
      {/* Checkered pattern on black quadrant */}
      {[0,1,2,3].map(row => [0,1,2,3].map(col => (
        (row + col) % 2 === 0 &&
        <rect key={`${row}-${col}`} x={19 + col * 7.5} y={19 + row * 8} width="7.5" height="8" fill="white" opacity="0.7"/>
      )))}
      {/* Center divider */}
      <line x1="50" y1="8" x2="50" y2="88" stroke="#C8A000" strokeWidth="1"/>
      <line x1="18" y1="52" x2="82" y2="52" stroke="#C8A000" strokeWidth="1"/>
      {/* Shield border */}
      <path d="M50 8 L82 18 L82 52 C82 72 50 88 50 88 C50 88 18 72 18 52 L18 18 Z" fill="none" stroke="#C8A000" strokeWidth="2"/>
      {/* Helmet */}
      <ellipse cx="50" cy="10" rx="12" ry="8" fill="#8B7355"/>
      <path d="M38 8 Q50 2 62 8 Q60 14 50 15 Q40 14 38 8Z" fill="#C8A000"/>
      {/* Crown */}
      <path d="M40 3 L44 6 L50 1 L56 6 L60 3 L58 8 L42 8 Z" fill="#C8A000"/>
      {/* Leaves */}
      <path d="M18 18 C12 14 8 18 10 24 C14 20 16 22 18 26Z" fill="#2D5A1B"/>
      <path d="M82 18 C88 14 92 18 90 24 C86 20 84 22 82 26Z" fill="#2D5A1B"/>
      {/* Banner */}
      <path d="M24 80 Q50 86 76 80 L78 88 Q50 94 22 88 Z" fill="#5C3D8A"/>
      <text x="50" y="88" textAnchor="middle" fill="#F5D000" fontFamily="Arial, sans-serif" fontSize="4.5" fontWeight="bold" letterSpacing="0.5">POLÍCIA MILITAR · MATO GROSSO</text>
      {/* Text below */}
      <text x="50" y="100" textAnchor="middle" fill="#5C3D8A" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="900" letterSpacing="1">POLÍCIA</text>
      <text x="50" y="109" textAnchor="middle" fill="#5C3D8A" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="900" letterSpacing="1">MILITAR</text>
    </svg>
  )
}

export function LogoSAMU() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="72" height="72" role="img" aria-label="SAMU 192 Serviço de Atendimento Móvel de Urgência">
      {/* Outer orange ring */}
      <circle cx="50" cy="50" r="48" fill="#E8650A"/>
      <circle cx="50" cy="50" r="42" fill="white"/>
      {/* Circular text top */}
      <path id="topArc" d="M 10 50 A 40 40 0 0 1 90 50" fill="none"/>
      <text fontFamily="Arial, sans-serif" fontSize="5.2" fontWeight="bold" fill="#E8650A" letterSpacing="1">
        <textPath href="#topArc" startOffset="5%">SERVIÇO DE ATENDIMENTO MÓVEL DE URGÊNCIA</textPath>
      </text>
      {/* Circular text bottom */}
      <path id="botArc" d="M 12 58 A 38 38 0 0 0 88 58" fill="none"/>
      <text fontFamily="Arial, sans-serif" fontSize="5.5" fontWeight="bold" fill="#E8650A" letterSpacing="1.5">
        <textPath href="#botArc" startOffset="8%">SISTEMA ÚNICO DE SAÚDE</textPath>
      </text>
      {/* Star of Life — 6 arms */}
      {[0,60,120,180,240,300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 50 + Math.sin(rad) * 14
        const cy = 50 - Math.cos(rad) * 14
        return <rect key={i} x={cx - 5} y={cy - 9} width="10" height="18" rx="2" fill="#C8102E" transform={`rotate(${angle}, ${cx}, ${cy})`}/>
      })}
      <circle cx="50" cy="50" r="10" fill="#C8102E"/>
      {/* Rod of Asclepius */}
      <line x1="50" y1="34" x2="50" y2="66" stroke="white" strokeWidth="2.5"/>
      <path d="M46 40 Q53 43 46 46 Q53 49 46 52 Q53 55 46 58" fill="none" stroke="white" strokeWidth="1.8"/>
      {/* Top of staff */}
      <circle cx="50" cy="34" r="2" fill="white"/>
    </svg>
  )
}

export function LogoBombeiros() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="72" height="72" role="img" aria-label="Corpo de Bombeiros Militar de Mato Grosso">
      {/* Outer red ring */}
      <circle cx="50" cy="50" r="48" fill="#CC0000"/>
      <circle cx="50" cy="50" r="40" fill="white"/>
      <circle cx="50" cy="50" r="38" fill="white" stroke="#CC0000" strokeWidth="0.5"/>
      {/* Circular text top */}
      <path id="bombTop" d="M 13 50 A 37 37 0 0 1 87 50" fill="none"/>
      <text fontFamily="Arial, sans-serif" fontSize="5" fontWeight="bold" fill="#CC0000" letterSpacing="0.8">
        <textPath href="#bombTop" startOffset="2%">CORPO DE BOMBEIROS MILITAR DE MATO GROSSO</textPath>
      </text>
      {/* Circular text bottom */}
      <path id="bombBot" d="M 20 60 A 30 30 0 0 0 80 60" fill="none"/>
      <text fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold" fill="#CC0000" letterSpacing="2">
        <textPath href="#bombBot" startOffset="18%">· 1964 ·</textPath>
      </text>
      {/* Shield */}
      <path d="M50 22 L64 27 L64 44 C64 54 50 60 50 60 C50 60 36 54 36 44 L36 27 Z" fill="#CC0000" stroke="#F5D000" strokeWidth="1.5"/>
      {/* Shield quadrants */}
      <path d="M50 22 L64 27 L64 44 L50 44 Z" fill="#2D7A2D"/>
      <path d="M50 44 L64 44 C64 54 50 60 50 60 Z" fill="#CC0000"/>
      <path d="M36 27 L50 27 L50 44 L36 44 Z" fill="#CC0000"/>
      <path d="M36 44 L50 44 L50 60 C50 60 36 54 36 44 Z" fill="#2D7A2D"/>
      <path d="M50 22 L50 60" stroke="#F5D000" strokeWidth="1"/>
      <path d="M36 44 L64 44" stroke="#F5D000" strokeWidth="1"/>
      {/* Flames on top */}
      <path d="M47 22 C47 18 50 14 50 14 C50 14 53 18 53 22" fill="#F5D000" stroke="#CC0000" strokeWidth="0.5"/>
      <path d="M44 23 C44 19 47 16 47 16 C47 16 50 19 50 23" fill="#F5A000" opacity="0.8"/>
      <path d="M50 23 C50 19 53 16 53 16 C53 16 56 19 56 23" fill="#F5A000" opacity="0.8"/>
      {/* Axes */}
      <line x1="32" y1="30" x2="68" y2="55" stroke="#F5D000" strokeWidth="2"/>
      <line x1="68" y1="30" x2="32" y2="55" stroke="#F5D000" strokeWidth="2"/>
      <path d="M28 27 L34 33 L32 36 L26 30 Z" fill="#F5D000"/>
      <path d="M72 27 L66 33 L68 36 L74 30 Z" fill="#F5D000"/>
      <path d="M28 58 L34 52 L32 49 L26 55 Z" fill="#F5D000"/>
      <path d="M72 58 L66 52 L68 49 L74 55 Z" fill="#F5D000"/>
    </svg>
  )
}

export function LogoDisque100() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="72" height="72" role="img" aria-label="Disque 100 Direitos Humanos">
      <circle cx="50" cy="50" r="48" fill="#1351B4"/>
      <circle cx="50" cy="50" r="40" fill="#1351B4" stroke="white" strokeWidth="1.5"/>
      {/* Family figures */}
      {/* Adult left */}
      <circle cx="34" cy="32" r="6" fill="white"/>
      <path d="M26 58 C26 46 42 46 42 58 L40 70 L28 70 Z" fill="white"/>
      {/* Adult right */}
      <circle cx="66" cy="32" r="6" fill="white"/>
      <path d="M58 58 C58 46 74 46 74 58 L72 70 L60 70 Z" fill="white"/>
      {/* Child center */}
      <circle cx="50" cy="38" r="5" fill="white"/>
      <path d="M43 62 C43 52 57 52 57 62 L55 70 L45 70 Z" fill="white"/>
      {/* Hands joined */}
      <path d="M42 54 Q50 50 58 54" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="50" y="82" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="8.5" fontWeight="bold" letterSpacing="1">DISQUE 100</text>
      <text x="50" y="92" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="4.5" letterSpacing="0.5">DIREITOS HUMANOS</text>
    </svg>
  )
}

export function LogoLigue180() {
  return (
    <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" width="120" height="75" role="img" aria-label="Ligue 180 Central de Atendimento à Mulher">
      <rect width="160" height="100" rx="12" fill="#9B30D0"/>
      {/* Woman figure */}
      {/* Head */}
      <circle cx="38" cy="28" r="10" fill="white"/>
      {/* Body/dress - raised arms */}
      <path d="M28 55 L38 40 L48 55 L52 85 L24 85 Z" fill="white"/>
      {/* Left arm raised */}
      <path d="M28 55 L14 35" stroke="white" strokeWidth="6" strokeLinecap="round"/>
      {/* Right arm raised */}
      <path d="M48 55 L62 35" stroke="white" strokeWidth="6" strokeLinecap="round"/>
      {/* Text LIGUE */}
      <text x="90" y="42" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="900" letterSpacing="2">LIGUE</text>
      {/* Text 180 */}
      <text x="90" y="72" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="900" letterSpacing="2">180</text>
      {/* Subtitle */}
      <text x="90" y="88" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="7" letterSpacing="0.5" opacity="0.9">Central de Atendimento à Mulher</text>
    </svg>
  )
}

export function LogoPoliciaACivil() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="72" height="72" role="img" aria-label="Polícia Civil MT">
      <circle cx="50" cy="50" r="48" fill="#1A3A5C"/>
      <circle cx="50" cy="50" r="40" fill="#1A3A5C" stroke="#C8A951" strokeWidth="1.5"/>
      <path id="civTop" d="M 15 50 A 35 35 0 0 1 85 50" fill="none"/>
      <text fontFamily="Arial, sans-serif" fontSize="5.5" fontWeight="bold" fill="#C8A951" letterSpacing="1">
        <textPath href="#civTop" startOffset="8%">POLÍCIA JUDICIÁRIA CIVIL</textPath>
      </text>
      <path id="civBot" d="M 20 58 A 30 30 0 0 0 80 58" fill="none"/>
      <text fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold" fill="#C8A951" letterSpacing="3">
        <textPath href="#civBot" startOffset="18%">MATO GROSSO</textPath>
      </text>
      {/* Badge */}
      <path d="M50 24 L62 29 L62 44 C62 54 50 60 50 60 C50 60 38 54 38 44 L38 29 Z" fill="none" stroke="#C8A951" strokeWidth="2"/>
      <path d="M50 24 L62 29 L62 44 C62 54 50 60 50 60 C50 60 38 54 38 44 L38 29 Z" fill="#C8A951" opacity="0.15"/>
      <text x="50" y="41" textAnchor="middle" fill="#C8A951" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold">PC</text>
      <text x="50" y="52" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="6" letterSpacing="1">MT</text>
      {/* Stars */}
      {[-20, 0, 20].map((offset, i) => (
        <text key={i} x={50 + offset} y="68" textAnchor="middle" fill="#C8A951" fontSize="8">★</text>
      ))}
    </svg>
  )
}
