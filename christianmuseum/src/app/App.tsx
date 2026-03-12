import React, { useState, useRef, useEffect } from 'react';
import logoImg from 'figma:asset/2de068f70a9ccdc3541e811ccf0d22ece0044128.png';
import exImg1 from 'figma:asset/97a4598f902b711ab99eb06831e1bb43228e776c.png';
import exImg2 from 'figma:asset/e1bb0e4859cf6855f6eade50ea4e6b8d6a2660e4.png';
import heroImg from 'figma:asset/35f0ec1ee68850e139b5a846358bb27915acf099.png';
import bgClock from 'figma:asset/c0f3eb2c6da8389d5a7e333c2cbba7ff8fa35915.png';
import bgTicket from 'figma:asset/3d58e3f7ed61e767217c8c89a157596776b71c55.png';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import {
  Headphones,
  Heart,
  UserCheck,
  Train,
  Bus,
  Building2,
  ArrowRight,
  Menu,
  CalendarCheck,
  CalendarDays,
  Gift,
  Clock,
} from 'lucide-react';

// ─── Unsplash Exhibition Images ─────────────────────────────────────────────
const EX_IMG_1 = exImg1;
const EX_IMG_2 = exImg2;

const BG_CLOCK = bgClock;
const BG_TICKET = bgTicket;

// ─── Notice Data ─────────────────────────────────────────────────────────────
const noticeItems = [
  {
    id: 1,
    title: '홈페이지 개관련 안내',
    excerpt: '박물관 홈페이지 개편작업으로 기존 홈페이지는 3월까지만...',
    date: '2026.02.27',
  },
  {
    id: 2,
    title: '홈페이지 개관련 안내',
    excerpt: '박물관 홈페이지 개편작업으로 기존 홈페이지는 3월까지만...',
    date: '2026.02.27',
  },
  {
    id: 3,
    title: '홈페이지 개관련 안내',
    excerpt: '박물관 홈페이지 개편작업으로 기존 홈페이지는 3월까지만...',
    date: '2026.02.27',
  },
  {
    id: 4,
    title: '홈페이지 개관련 안내',
    excerpt: '박물관 홈페이지 개편작업으로 기존 홈페이지는 3월까지만...',
    date: '2026.02.27',
  },
];

const archiveItems = [
  {
    id: 1,
    title: '선교역사 자료 아카이브',
    excerpt: '초창기 선교사들의 문헌 자료 및 사진 자료...',
    date: '2026.01.15',
  },
  {
    id: 2,
    title: '기증유물 목록 공개',
    excerpt: '2025년 기증받은 유물 목록을 공개합니다...',
    date: '2026.01.08',
  },
  {
    id: 3,
    title: '박물관 연구보고서 발간',
    excerpt: '한국기독교선교 100주년 기념 연구보고서...',
    date: '2025.12.20',
  },
  {
    id: 4,
    title: '2025 유물 기증 현황 정리',
    excerpt: '2025년 한 해 동안 기증받은 유물 현황을 정리하여...',
    date: '2025.12.05',
  },
];

// ─── FadeUp Scroll Animation ──────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(44px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

// 꽃 + ₩ 커스텀 아이콘
function FlowerWonIcon() {
  const d = "M 32.217 12.946 A 7.15 7.15 0 0 1 32.217 27.054 A 7.15 7.15 0 0 1 20 34.109 A 7.15 7.15 0 0 1 7.783 27.054 A 7.15 7.15 0 0 1 7.783 12.946 A 7.15 7.15 0 0 1 20 5.891 A 7.15 7.15 0 0 1 32.217 12.946 Z";
  return (
    <svg width="38" height="38" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path
        d={d}
        fill="none"
        stroke="#c5a059"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="22"
        fill="#c5a059"
        fontFamily="sans-serif"
        fontWeight="700"
        stroke="none"
      >
        ₩
      </text>
    </svg>
  );
}

function InfoHoverCard({
  title,
  mainText,
  subText,
  cornerIcon,
  bgImage,
}: {
  title: string;
  mainText: string;
  subText: string;
  cornerIcon: React.ReactNode;
  bgImage?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '1.5rem',
        minHeight: '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      {bgImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            filter: hovered ? 'blur(4px)' : 'blur(0px)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'filter 0.4s ease, transform 0.4s ease',
          }}
        />
      )}
      {/* Black overlay */}
      {bgImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: hovered ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.3)',
            zIndex: 1,
            transition: 'background-color 0.4s ease',
          }}
        />
      )}
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: bgImage ? '#FAFAF8' : '#111111',
            fontFamily: 'Pretendard, sans-serif',
            marginBottom: '0.4rem',
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: '1.25rem',
            color: bgImage ? '#FAFAF8' : '#333333',
            fontFamily: 'Pretendard, sans-serif',
          }}
        >
          {mainText}
        </p>
        <p
          style={{
            fontSize: '1rem',
            color: bgImage ? '#FAFAF8' : '#666666',
            marginTop: '0.5rem',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            lineHeight: 1.6,
            fontFamily: 'Pretendard, sans-serif',
          }}
        >
          {subText}
        </p>
      </div>
      {/* Bottom-right icon disappears on hover */}
      <div
        className="absolute bottom-4 right-4"
        style={{
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.3s ease',
          zIndex: 2,
        }}
      >
        {cornerIcon}
      </div>
    </div>
  );
}

function HeroIconCard({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string }>;
  label: string;
}) {
  const [animKey, setAnimKey] = useState(0);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-2xl flex flex-col items-center justify-center cursor-pointer"
      style={{
        backgroundColor: 'transparent',
        padding: '1.75rem 1rem',
        minHeight: '130px',
        gap: '0.75rem',
      }}
      onMouseEnter={() => { setHovered(true); setAnimKey((k) => k + 1); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* SVG comet border — viewBox 200×130 */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        viewBox="0 0 200 130"
        preserveAspectRatio="none"
      >
        {/* 기본 희미한 외곽선 */}
        <path
          d="M 17.5 1.5 L 182.5 1.5 A 16 16 0 0 1 198.5 17.5 L 198.5 112.5 A 16 16 0 0 1 182.5 128.5 L 17.5 128.5 A 16 16 0 0 1 1.5 112.5 L 1.5 17.5 A 16 16 0 0 1 17.5 1.5 Z"
          fill="none"
          stroke="#c5a059"
          strokeOpacity={hovered ? 0.9 : 0.45}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{
            transition: hovered
              ? 'stroke-opacity 500ms ease 1900ms'
              : 'stroke-opacity 400ms ease',
          }}
        />
        {/* 혜성 세그먼트 */}
        <path
          d="M 17.5 1.5 L 182.5 1.5 A 16 16 0 0 1 198.5 17.5 L 198.5 112.5 A 16 16 0 0 1 182.5 128.5 L 17.5 128.5 A 16 16 0 0 1 1.5 112.5 L 1.5 17.5 A 16 16 0 0 1 17.5 1.5 Z"
          fill="none"
          stroke="#c5a059"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          pathLength="1000"
          strokeDasharray="220 780"
          strokeDashoffset={0}
          strokeOpacity={0}
          filter="url(#cometGlow)"
          style={{
            animation: hovered
              ? 'cometSweep 2200ms cubic-bezier(0.4,0,0.2,1) forwards'
              : 'none',
          }}
        />
      </svg>

      <Icon
        key={animKey}
        size={36}
        strokeWidth={1.5}
        style={{ color: '#c5a059', position: 'relative', zIndex: 2 }}
        className="draw-icon"
      />
      <span
        style={{
          fontSize: '1.5rem',
          color: '#FAFAF8',
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: 700,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function MissionActionBtn({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string }>;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // viewBox 400×300 (4:3) → perimeter ≈ 2*(397+297) - 8*16 + 2π*16 ≈ 1380
  const PERIMETER = 1380;

  return (
    <div
      className="relative cursor-pointer"
      style={{
        aspectRatio: '2 / 1.95',
        borderRadius: '60px',
        padding: '0.3rem 1rem',
      }}
      onMouseEnter={() => { setHovered(true); setAnimKey((k) => k + 1); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Keyframes for comet — fades in, sweeps, then fades out before end */}
      <style>{`
        @keyframes cometSweep {
          0%   { stroke-dashoffset: 0;     stroke-opacity: 0; }
          6%   { stroke-opacity: 0.95; }
          82%  { stroke-opacity: 0.95; }
          100% { stroke-dashoffset: -1000; stroke-opacity: 0; }
        }
      `}</style>

      {/* SVG stroke-drawing border */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        viewBox="0 0 300 293"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="cometGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 항상 표시되는 희미한 외곽선 */}
        <path
          d="M 17.5 1.5 L 282.5 1.5 A 16 16 0 0 1 298.5 17.5 L 298.5 275.5 A 16 16 0 0 1 282.5 291.5 L 17.5 291.5 A 16 16 0 0 1 1.5 275.5 L 1.5 17.5 A 16 16 0 0 1 17.5 1.5 Z"
          fill="none"
          stroke="#c5a059"
          strokeOpacity={hovered ? 0.9 : 0.45}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{
            transition: hovered
              ? 'stroke-opacity 500ms ease 1900ms'
              : 'stroke-opacity 400ms ease',
          }}
        />

        {/* 혜성 세그먼트 — keyframes로 sweep 후 자동 fade-out */}
        <path
          d="M 17.5 1.5 L 282.5 1.5 A 16 16 0 0 1 298.5 17.5 L 298.5 275.5 A 16 16 0 0 1 282.5 291.5 L 17.5 291.5 A 16 16 0 0 1 1.5 275.5 L 1.5 17.5 A 16 16 0 0 1 17.5 1.5 Z"
          fill="none"
          stroke="#c5a059"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          pathLength="1000"
          strokeDasharray="220 780"
          strokeDashoffset={0}
          strokeOpacity={0}
          filter="url(#cometGlow)"
          style={{
            animation: hovered
              ? 'cometSweep 2200ms cubic-bezier(0.4,0,0.2,1) forwards'
              : 'none',
          }}
        />
      </svg>

      {/* Icon — top right */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 2,
        }}
      >
        <Icon
          key={animKey}
          size={42}
          strokeWidth={1.5}
          className="draw-icon"
          style={{
            color: '#c5a059',
            transition: 'color 500ms ease',
          }}
        />
      </div>

      {/* Label — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.25rem',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: '1.5rem',
            color: hovered ? '#c5a059' : '#FAFAF8',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 700,
            transition: 'color 500ms ease',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function TransportCard({
  Icon,
  title,
  details,
  showDivider,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  title: string;
  details: string[];
  showDivider?: boolean;
}) {
  return (
    <div
      className="flex items-start"
      style={{
        padding: '1.25rem 0.25rem',
        gap: '1rem',
        borderBottom: showDivider ? '1px solid #FAFAF8' : 'none',
      }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: '48px',
          height: '48px',
        }}
      >
        <Icon size={26} strokeWidth={1.5} style={{ color: '#c5a059' }} />
      </div>
      <div>
        <p
          style={{
            fontSize: '24px',
            color: '#FAFAF8',
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 600,
            marginBottom: '0.25rem',
          }}
        >
          {title}
        </p>
        {details.map((d, i) => (
          <p
            key={i}
            style={{
              fontSize: '18px',
              color: '#AAAAAA',
              fontFamily: 'Pretendard, sans-serif',
              lineHeight: 1.7,
            }}
          >
            {d}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function Navigation() {
  return (
    <nav
      className="w-full"
      style={{
        backgroundColor: '#111111',
        borderBottom: '1px solid #222222',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: '1800px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '88px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            whiteSpace: 'nowrap',
            minWidth: '220px',
          }}
        >
          <img
            src={logoImg}
            alt="한국기독교선교박물관"
            style={{ height: '40px', width: 'auto', display: 'block' }}
          />
        </div>

        {/* Nav Items */}
        <div
          className="nav-items flex-1 flex items-center justify-center"
          style={{ gap: '2.5rem' }}
        >
          {['박물관소개', '이용안내', '박물관소식', '린마당'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: '20px',
                color: '#FAFAF8',
                fontFamily: 'Pretendard, sans-serif',
                textDecoration: 'none',
                opacity: 0.9,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="nav-right flex items-center" style={{ gap: '0.75rem' }}>
          <span className="nav-auth-links flex items-center" style={{ gap: '0.75rem' }}>
            <button
              style={{
                fontSize: '1rem',
                color: '#AAAAAA',
                backgroundColor: 'transparent',
                border: '1px solid #FAFAF8',
                borderRadius: '60px',
                padding: '0.3rem 1rem',
                cursor: 'pointer',
                fontFamily: 'Pretendard, sans-serif',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = '0.6')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = '1')
              }
            >
              동래중앙교회
            </button>
            <a
              href="#"
              style={{
                fontSize: '1rem',
                color: '#AAAAAA',
                fontFamily: 'Pretendard, sans-serif',
                textDecoration: 'none',
              }}
            >
              로그인
            </a>
            <span style={{ color: '#444444', fontSize: '0.75rem' }}>|</span>
            <a
              href="#"
              style={{
                fontSize: '1rem',
                color: '#AAAAAA',
                fontFamily: 'Pretendard, sans-serif',
                textDecoration: 'none',
              }}
            >
              회원가입
            </a>
          </span>
          <button
            style={{
              marginLeft: '0.75rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="hero-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '1rem',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        alignItems: 'stretch',
      }}
    >
      {/* Left: Hero Image */}
      <FadeUp delay={0} style={{ minHeight: '400px' }} className="hero-img-wrap rounded-2xl overflow-hidden">
        <img
          src={heroImg}
          alt="한국기독교선교박물관 전시 내부"
          className="hero-img"
          style={{
            width: '100%',
            height: '600px',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </FadeUp>

      {/* Right: Icon cards + Info cards */}
      <FadeUp delay={150} style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: '1rem' }}>
        {/* Top row: 3 icon cards */}
        <div
          className="hero-icon-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          <HeroIconCard Icon={Headphones} label="전시관안내" />
          <HeroIconCard Icon={Heart} label="대표소장품" />
          <HeroIconCard Icon={UserCheck} label="관람신청" />
        </div>

        {/* Bottom row: 2 info cards */}
        <div
          className="hero-info-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}
        >
          <InfoHoverCard
            title="개관시간"
            mainText="화~토 오전10시~오후5시"
            subText="(일, 월 정기휴관, 공휴일 및 명절연휴기간 휴관)"
            cornerIcon={<Clock size={38} strokeWidth={1.5} style={{ color: '#CCCCCC' }} />}
            bgImage={BG_CLOCK}
          />
          <InfoHoverCard
            title="관람료"
            mainText="무료"
            subText="한국기독교선교박물관은 누구나 무료로 관람할 수 있습니다. 예약현황을 확인하신 후 일정이 기존예약과 중복되지 않도록 예약바랍니다. (통화가능한 전화번호를 명기-통화연결 불가 시 예약이 어려울수 있습니다)"
            cornerIcon={<FlowerWonIcon />}
            bgImage={BG_TICKET}
          />
        </div>
      </FadeUp>
    </section>
  );
}

// ─── Section 2: Mission ───────────────────────────────────────────────────────
function MissionSection() {
  return (
    <section
      className="mission-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.8fr',
        gap: '8.5rem',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        alignItems: 'stretch',
      }}
    >
      {/* Left: Museum Name + Description */}
      <FadeUp delay={0}>
        <h2
          className="mission-h2"
          style={{
            fontSize: '3.5rem',
            fontFamily: "'BookendBatang', Georgia, serif",
            color: '#c5a059',
            lineHeight: 1.08,
            fontWeight: 700,
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          KOREA CHRISTIAN
          <br />
          MISSION MUSEUM
        </h2>
        <p
          className="mission-desc"
          style={{
            fontSize: '1.125rem',
            color: '#AAAAAA',
            lineHeight: 1.85,
            fontFamily: 'Pretendard, sans-serif',
            fontWeight: 300,
          }}
        >
          한국기독교선교박물관은 초창기 선교사들의 활동을 통해
          <br />
          전해진 복음의 문화들을 여러분과 나누고자 합니다.
          <br />
          우리 박물관엔 전시되어 있는 초창기 한국교회의 유산인
          <br />
          바로찬 각시, 사진 등 1,000여 점을 통해 한국 기독교의 갯뿌리를
          <br />
          돌아보고 미래를 전망하는 시간을 가질 수 있기 기대합니다.
        </p>
      </FadeUp>

      {/* Right: 3 Action Buttons */}
      <div
        className="mission-btn-row"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }}
      >
        <FadeUp delay={100}><MissionActionBtn Icon={CalendarCheck} label="관람신청" /></FadeUp>
        <FadeUp delay={200}><MissionActionBtn Icon={CalendarDays} label="예약현황" /></FadeUp>
        <FadeUp delay={300}><MissionActionBtn Icon={Gift} label="기증안내" /></FadeUp>
      </div>
    </section>
  );
}

// ─── Section 3: Community ────────────────────────────────────────────────────
function CommunitySection() {
  const [activeTab, setActiveTab] = useState<'notice' | 'archive'>('notice');
  const items = activeTab === 'notice' ? noticeItems : archiveItems;

  return (
    <section
      className="community-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.8fr',
        gap: '8.5rem',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        alignItems: 'start',
      }}
    >
      {/* Left: Notice / Archive */}
      <FadeUp delay={0}>
        {/* Tab Headers */}
        <div className="flex items-end" style={{ gap: '1.25rem', marginBottom: '0.75rem' }}>
          <button
            onClick={() => setActiveTab('notice')}
            className="comm-tab-btn"
            style={{
              fontSize: '2.25rem',
              fontFamily: 'Pretendard, Georgia, serif',
              color: activeTab === 'notice' ? '#FAFAF8' : '#555555',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontWeight: activeTab === 'notice' ? 700 : 400,
              transition: 'color 0.2s',
            }}
          >
            공지사항
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className="comm-tab-btn"
            style={{
              fontSize: '2.25rem',
              fontFamily: 'Pretendard, Georgia, serif',
              color: activeTab === 'archive' ? '#FAFAF8' : '#555555',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontWeight: activeTab === 'archive' ? 700 : 400,
              transition: 'color 0.2s',
            }}
          >
            자료실
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#333333', marginBottom: '0.5rem' }} />

        {/* Notice items */}
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              style={{ padding: '1rem 0', position: 'relative' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.opacity = '0.75';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.opacity = '1';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: '1.25rem',
                      color: '#FAFAF8',
                      fontFamily: 'Pretendard, sans-serif',
                      fontWeight: 500,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#888888',
                      fontFamily: 'Pretendard, sans-serif',
                    }}
                  >
                    {item.excerpt}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: '#888888',
                    fontFamily: 'Pretendard, sans-serif',
                    whiteSpace: 'nowrap',
                    paddingTop: '2px',
                  }}
                >
                  {item.date}
                </span>
              </div>
              {/* 구분선 — border 대신 별도 div 사용 */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: '#2A2A2A' }} />
            </div>
          ))}
        </div>

        {/* VIEW ALL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1.5rem',
          }}
        >
          <button
            className="flex items-center"
            style={{
              fontSize: '1rem',
              color: '#AAAAAA',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Pretendard, sans-serif',
              gap: '0.4rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#FAFAF8')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#AAAAAA')
            }
          >
            VIEW ALL <ArrowRight size={15} />
          </button>
        </div>
      </FadeUp>

      {/* Right: Exhibition */}
      <FadeUp delay={180}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h3
            style={{
              fontSize: '2.25rem',
              fontFamily: 'Pretendard, Georgia, serif',
              color: '#FAFAF8',
              fontWeight: 600,
            }}
          >
            전시안내
          </h3>
          <button
            className="flex items-center"
            style={{
              fontSize: '1rem',
              color: '#AAAAAA',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Pretendard, sans-serif',
              gap: '0.4rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#FAFAF8')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = '#AAAAAA')
            }
          >
            VIEW ALL <ArrowRight size={15} />
          </button>
        </div>

        {/* Exhibition Cards Grid */}
        <div
          className="ex-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}
        >
          {[
            {
              img: EX_IMG_1,
              title: "2025 기획전 'HIC ET NUNC 지금 여기'",
            },
            {
              img: EX_IMG_2,
              title: "2025 기획전 'The Wind Blows'",
            },
          ].map((ex, i) => (
            <div
              key={i}
              className={`ex-card relative rounded-2xl overflow-hidden cursor-pointer${i === 1 ? ' ex-card-second' : ''}`}
              style={{ aspectRatio: '3 / 4' }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <ImageWithFallback
                src={ex.img}
                alt={ex.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Text overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  pointerEvents: 'none',
                }}
              >
                <p
                  style={{
                    fontSize: '1.5rem',
                    color: '#FAFAF8',
                    fontFamily: 'Pretendard, sans-serif',
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {ex.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

// ─── Section 4: Location ─────────────────────────────────────────────────────
function LocationSection() {
  return (
    <section
      className="location-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8.5rem',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        alignItems: 'stretch',
      }}
    >
      {/* Left: Map */}
      <FadeUp delay={0} className="location-map rounded-2xl overflow-hidden" style={{ minHeight: '320px' }}>
        <iframe
          src="https://maps.google.com/maps?q=한국기독교선교박물관&z=17&output=embed&hl=ko"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '320px',
            border: 'none',
            display: 'block',
          }}
          title="한국기독교선교박물관 위치"
          allowFullScreen
        />
      </FadeUp>

      {/* Right: Transport info */}
      <FadeUp delay={180} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', justifyContent: 'center' }}>
        <TransportCard
          Icon={Building2}
          title="한국기독교선교박물관"
          details={[
            '주소 : (우)47817 부산광역시 동래구 충렬대로202번가길 13 3층',
            '전화 : 051-555-3096',
          ]}
          showDivider
        />
        <TransportCard
          Icon={Train}
          title="지하철"
          details={[
            '1호선 동래역 2번 출구 (도보 10분 소요)',
            '4호선 수안역 2번 출구 (도보 2분 소요)',
          ]}
          showDivider
        />
        <TransportCard
          Icon={Bus}
          title="버스"
          details={[
            '31, 43, 44, 57, 120-1, 144, 148, 200, 307, 506번 (메가마트 하차)',
            '29, 51, 52, 110-1, 179번 (동래경찰서 하차)',
          ]}
        />
      </FadeUp>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0D0D0D',
        borderTop: '1px solid #1E1E1E',
        padding: '2.5rem 0',
      }}
    >
      <FadeUp delay={0}>
        <div
          className="footer-grid"
          style={{
            maxWidth: '1800px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'flex-end',
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1.25rem',
              }}
            >
              <p
                style={{
                  fontSize: '1rem',
                  color: '#666666',
                  fontFamily: 'Pretendard, sans-serif',
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                (우)47817 부산광역시 동래구 충렬대로202번가길 13 3층
                <br />
                TEL : 051-555-3096
              </p>
            </div>
            
          </div>

          {/* Right: Copyright */}
          <div className="footer-right" style={{ textAlign: 'right' }}>
            <p
              style={{
                fontSize: '2rem',
                fontFamily: 'Pretendard, sans-serif',
                color: '#FAFAF8',
                opacity: 0.5,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              COPYRIGHT(C)
            </p>
            <p
              style={{
                fontSize: '1.5rem',
                fontFamily: 'Pretendard, sans-serif',
                color: '#FAFAF8',
                opacity: 0.5,
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              한국기독교선교박물관
            </p>
            <p
              style={{
                fontSize: '1rem',
                color: '#FAFAF8',
                opacity: 0.5,
                fontFamily: 'Pretendard, sans-serif',
                marginTop: '0.25rem',
              }}
            >
              ALL RIGHTS RESERVED. DESIGNED BY Stefan Info.
            </p>
            <p
              style={{
                fontSize: '1rem',
                color: '#FAFAF8',
                opacity: 0.5,
                fontFamily: 'Pretendard, sans-serif',
                marginTop: '0.15rem',
              }}
            >
              Copyright © 2026 Korea Christian Mission Museum.
            </p>
          </div>
        </div>
      </FadeUp>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      style={{
        backgroundColor: '#111111',
        minHeight: '100vh',
        fontFamily: 'Pretendard, sans-serif',
      }}
    >
      <style>{`
        /* ── Tablet (≤ 64rem / ~1024px) ──────────────────────────────── */
        @media (max-width: 64rem) {
          .nav-items { display: none !important; }
          .nav-right { margin-left: auto !important; }

          .main-container { padding: 0 1.5rem !important; }

          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 2rem !important;
          }
          .hero-img { height: 42vw !important; }

          .mission-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }

          .community-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }

          .location-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
          .location-map { min-height: 22rem !important; }
          .location-map iframe { height: 22rem !important; min-height: 22rem !important; }

          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .footer-right { text-align: left !important; }

          /* 전시 썸네일 → 1열, 두 번째 카드 숨김 */
          .ex-grid { grid-template-columns: 1fr !important; }
          .ex-card-second { display: none !important; }
        }

        /* ── Mobile (≤ 48rem / ~768px) ───────────────────────────────── */
        @media (max-width: 48rem) {
          .nav-inner { padding: 0 1rem !important; height: 3.5rem !important; }
          .nav-auth-links { display: none !important; }

          .main-container { padding: 0 1rem !important; }

          .hero-grid {
            padding-top: 1.5rem !important;
            padding-bottom: 1rem !important;
          }
          .hero-img { height: 56vw !important; }
          .hero-img-wrap { min-height: unset !important; }

          /* 아이콘 카드 → 1열, 가로 배치 */
          .hero-icon-row {
            grid-template-columns: 1fr !important;
            gap: 0.6rem !important;
          }
          .hero-icon-row > div {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-start !important;
            min-height: unset !important;
            padding: 1.2rem 1.25rem !important;
            gap: 0.85rem !important;
            border: 1px solid rgba(197, 160, 89, 0.5) !important;
            border-radius: 1rem !important;
          }
          /* 모바일 가로 배치 시 SVG 혜성 테두리 숨김(왜곡 방지) */
          .hero-icon-row > div > svg:first-child {
            display: none !important;
          }

          .hero-info-row { grid-template-columns: 1fr !important; }

          .mission-grid {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
            gap: 1.5rem !important;
          }
          .mission-h2 { font-size: 2rem !important; }
          .mission-desc { font-size: 1rem !important; }
          .mission-btn-row { grid-template-columns: 1fr !important; gap: 0.6rem !important; }

          /* MissionActionBtn → 가로 한 줄 (hero-icon-row와 동일) */
          .mission-btn-row > div > div {
            aspect-ratio: unset !important;
            min-height: unset !important;
            padding: 1.2rem 1.25rem !important;
            border-radius: 1rem !important;
            border: 1px solid rgba(197, 160, 89, 0.5) !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 0.85rem !important;
          }
          /* SVG 혜성 테두리 숨김 */
          .mission-btn-row > div > div > svg {
            display: none !important;
          }
          /* 아이콘·라벨 absolute 해제 → 정상 흐름 */
          .mission-btn-row > div > div > div:nth-of-type(1),
          .mission-btn-row > div > div > div:nth-of-type(2) {
            position: static !important;
            display: flex !important;
            align-items: center !important;
          }

          .comm-tab-btn { font-size: 1.5rem !important; }
          .community-grid {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }

          .location-grid {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
          .location-map { min-height: 16rem !important; }
          .location-map iframe { height: 16rem !important; min-height: 16rem !important; }

          .footer-grid { padding: 0 1rem !important; }
        }
      `}</style>

      <Navigation />

      <main
        className="main-container"
        style={{
          maxWidth: '1800px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        <HeroSection />
        <MissionSection />
        <CommunitySection />
        <LocationSection />
      </main>

      <Footer />
    </div>
  );
}