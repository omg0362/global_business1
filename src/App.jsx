import { useEffect, useState } from 'react'
import { featureCards, steps } from './content.js'
import { loadCabinetRecords, loadSkinRecord, saveCabinetRecords, saveSkinRecord } from './storage.js'

function StartButton({ children, variant = 'primary', path }) {
  return (
    <a className={`cta ${variant}`} href={path}>
      {children}<span aria-hidden="true">↗</span>
    </a>
  )
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-label="glowday 피부 분석과 화장대 분석 예시" role="img">
      <div className="orb orb-one" /><div className="orb orb-two" />
      <div className="analysis-card">
        <div className="card-top"><span className="live-dot" />오늘의 피부 리포트 <span>•••</span></div>
        <div className="face-scan"><div className="scan-ring ring-a" /><div className="scan-ring ring-b" /><span className="face-dot dot-a" /><span className="face-dot dot-b" /><span className="face-dot dot-c" /></div>
        <div className="score-row"><div><small>수분 밸런스</small><strong>82</strong></div><div><small>피부결</small><strong>76</strong></div><div><small>진정 케어</small><strong>89</strong></div></div>
      </div>
      <div className="cabinet-card"><span className="mini-label">MY CABINET</span><div className="bottle-row"><i /><i /><i /><i /></div><p><b>3개의 제품</b>이 오늘의 루틴에 어울려요</p></div>
      <div className="match-pill"><span>✦</span> 피부와 화장대를 함께 분석해요</div>
    </div>
  )
}

function Header() {
  return <header className="site-header"><a className="logo" href="#top">glow<span>day</span></a><nav aria-label="주요 메뉴"><a href="#story">why glowday</a><a href="#how">how it works</a><a href="#features">features</a><a href="#plans">plans</a></nav><span className="header-note">beta soon</span></header>
}

const startFlows = {
  '/skin-diagnosis': {
    eyebrow: 'SKIN DIAGNOSIS · START',
    title: <>내 피부를 이해하는<br /><em>첫 기록</em>부터 시작해요.</>,
    description: '피부 사진과 간단한 정보를 바탕으로, 이후의 맞춤 케어를 위한 출발점을 준비합니다.',
    step: '01',
    entryTitle: '피부 촬영 또는 이미지 업로드',
    entryText: '분석 기능은 준비 중이에요. 지금은 다음 단계에서 피부 정보를 차분히 기록할 수 있습니다.',
    entryAction: '촬영·업로드 준비 중',
    guideTitle: '진단 전 준비사항',
    guides: ['밝고 균일한 조명에서 촬영해 주세요.', '필터나 보정 없이 민낯에 가까운 상태를 권장해요.', '사진과 정보는 진단 기능이 준비된 뒤에만 분석에 활용됩니다.'],
    next: '피부 정보 기록으로',
    note: '다음 단계는 피부 컨디션을 기록하는 화면으로 확장될 예정입니다.',
    tone: 'skin',
  },
  '/my-cabinet': {
    eyebrow: 'MY GLOW CABINET · START',
    title: <>내 화장대의 제품을<br /><em>다시 연결</em>해보세요.</>,
    description: '이미 가진 화장품을 기록하고, 피부 정보와 함께 살펴볼 수 있는 나만의 화장대를 만들어가요.',
    step: '01',
    entryTitle: '화장품 검색 또는 직접 등록',
    entryText: '제품 검색과 등록 기능은 준비 중이에요. 지금은 다음 단계에서 보유 제품 정보를 기록할 수 있습니다.',
    entryAction: '제품 등록 준비 중',
    guideTitle: '등록한 제품은 이렇게 활용돼요',
    guides: ['제품별 성분과 사용 경험을 함께 기록해요.', '나중에 피부 컨디션에 맞는 활용 가능성을 살펴봐요.', '피부 정보와 연결해 조합과 루틴 분석으로 확장됩니다.'],
    next: '화장품 정보 기록으로',
    note: '다음 단계는 보유 화장품을 기록하는 화면으로 확장될 예정입니다.',
    tone: 'cabinet',
  },
}

function StartScreen({ flow }) {
  return <main className={`start-page ${flow.tone}`}>
    <header className="site-header start-header"><a className="logo" href="/">glow<span>day</span></a><a className="back-link" href="/">← 랜딩페이지로 돌아가기</a></header>
    <section className="start-hero section-shell">
      <div><p className="eyebrow"><span /> {flow.eyebrow}</p><p className="start-step">STEP {flow.step}</p><h1>{flow.title}</h1><p className="start-description">{flow.description}</p></div>
      <div className="start-orbit" aria-hidden="true"><span>✦</span><i /><b /></div>
    </section>
    <section className="start-content section-shell">
      <article className="start-entry"><p className="entry-kicker">GET STARTED</p><h2>{flow.entryTitle}</h2><p>{flow.entryText}</p><div className="entry-placeholder"><span>{flow.tone === 'skin' ? '◌' : '⌂'}</span><b>{flow.entryAction}</b><small>기능 오픈 후 이용할 수 있어요</small></div></article>
      <aside className="start-guide"><p className="entry-kicker">BEFORE YOU BEGIN</p><h2>{flow.guideTitle}</h2><ol>{flow.guides.map((guide, index) => <li key={guide}><span>0{index + 1}</span>{guide}</li>)}</ol></aside>
    </section>
    <section className="start-next section-shell"><div><span>UP NEXT</span><p>{flow.note}</p></div><button className="cta" type="button" onClick={() => window.alert('다음 단계는 준비 중입니다.')} >{flow.next}<span aria-hidden="true">→</span></button></section>
  </main>
}

const skinQuestions = [
  ['skinType', '피부 유형', '현재 알고 있는 피부 유형을 자유롭게 적어주세요.', 'text'],
  ['concern', '가장 해결하고 싶은 피부 고민', '수분 부족 및 속당김 해결|장벽 강화 및 민감성 트러블 완화|미백 및 색소 침착 개선|주름 및 탄력 개선|더 이상의 화장품 구매 실패와 돈 낭비 방지', 'select'],
  ['sensitivity', '피부 민감도', '평소 피부가 민감하다고 느끼는 정도나 상황을 자유롭게 적어주세요.', 'text'],
  ['reaction', '최근 피부 반응 및 화장품 사용 경험', '레티놀(비타민A) 계열에서 겪음|비타민C 계열에서 겪음|각질 제거 성분에서 겪음|기타|겪은 적 없음', 'select'],
  ['factor', '피부 상태에 영향을 주는 요인', '계절 변화 및 환절기|생리 주기 등 호르몬 변화|수면 부족 및 스트레스|맞지 않는 새로운 화장품 사용|미세먼지 등 외부 환경', 'select'],
  ['goal', '중요하게 생각하는 피부 관리 목표', '내 피부에 맞는 새로운 화장품 추천|이미 구매한 방치템을 계절별·조합별로 활용하는 방법|두 가지 모두 원함', 'select'],
]

const productTypes = ['토너', '에센스', '세럼', '크림', '클렌저', '기타']
const abandonReasons = ['바른 후 트러블이 올라와서', '너무 건조하거나 기름져서', '끈적임 등 발림성이 불쾌해서', '다른 제품과 함께 바르면 밀려서', '효과가 전혀 느껴지지 않아서']

function validateImage(file) {
  if (!file) return ''
  if (!file.type.startsWith('image/')) return '이미지 파일만 선택할 수 있어요.'
  if (file.size > 10 * 1024 * 1024) return '이미지는 10MB 이하 파일로 선택해 주세요.'
  return ''
}

function FlowHeader({ title, tone, step, onBack }) {
  return <><header className="site-header start-header"><a className="logo" href="/">glow<span>day</span></a><a className="back-link" href="/">← 랜딩페이지로 돌아가기</a></header><section className={`flow-heading section-shell ${tone}`}><p className="eyebrow"><span /> {tone === 'skin' ? 'SKIN DIAGNOSIS' : 'MY GLOW CABINET'}</p><div><h1>{title}</h1><span>STEP {step} / 3</span></div><div className="progress"><i className={step >= 1 ? 'on' : ''} /><i className={step >= 2 ? 'on' : ''} /><i className={step >= 3 ? 'on' : ''} /></div>{onBack && <button type="button" className="text-button" onClick={onBack}>← 이전 단계</button>}</section></>
}

function ImageInput({ value, onChange, tone = 'skin', label }) {
  const [error, setError] = useState('')
  const choose = (event) => {
    const file = event.target.files?.[0]
    const message = validateImage(file)
    setError(message)
    if (!message && file) onChange({ file, url: URL.createObjectURL(file) })
    event.target.value = ''
  }
  return <div className={`image-input ${tone}`}>{value?.url ? <><img src={value.url} alt={`${label} 미리보기`} /><div className="image-actions"><label className="small-button">다른 이미지 선택<input type="file" accept="image/*" capture="environment" onChange={choose} /></label><button type="button" className="small-button" onClick={() => onChange(null)}>삭제</button></div></> : <label className="upload-box"><input type="file" accept="image/*" capture="environment" onChange={choose} /><span>{tone === 'skin' ? '◌' : '⌂'}</span><b>{label} 선택</b><small>JPG, PNG 등 이미지 · 최대 10MB</small></label>}{error && <p className="form-error">{error}</p>}</div>
}

function SkinFlow() {
  const [image, setImage] = useState(null)
  const [answers, setAnswers] = useState(() => loadSkinRecord().answers || {})
  const [step, setStep] = useState(1)
  const [notice, setNotice] = useState('')
  useEffect(() => { saveSkinRecord({ answers, updatedAt: new Date().toISOString() }) }, [answers])
  const setAnswer = (key, value) => setAnswers((current) => ({ ...current, [key]: value }))
  const requiredReady = image && answers.concern && answers.reaction && answers.factor && answers.goal
  const clear = () => { setImage(null); setAnswers({}); saveSkinRecord({}); setStep(1) }
  if (step === 3) return <main className="flow-page skin"><FlowHeader tone="skin" title="입력 내용을 확인해 주세요." step={3} onBack={() => setStep(2)} /><section className="flow-body section-shell"><article className="summary-card"><div className="summary-top"><h2>피부 기록 요약</h2><button className="text-button" onClick={() => setStep(1)}>사진 수정</button></div>{image?.url ? <img className="summary-image" src={image.url} alt="선택한 피부 사진" /> : <p className="missing">이 세션에서 선택한 이미지가 없습니다. 이미지는 브라우저에 저장되지 않아요.</p>}<dl>{skinQuestions.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{answers[key] || <span className="missing">입력 필요</span>}</dd></div>)}</dl><div className="summary-actions"><button className="cta secondary" onClick={() => setStep(2)}>설문 수정</button><a className="cta" href="/integrated-review">통합 정보 확인 <span>→</span></a><button className="text-button danger" onClick={clear}>모든 입력 삭제</button></div></article><p className="privacy-note">이미지는 이 브라우저 탭에서만 미리보기에 사용되며 저장·전송되지 않습니다. 분석 결과는 아직 생성하지 않습니다.</p></section></main>
  return <main className="flow-page skin"><FlowHeader tone="skin" title={step === 1 ? '피부 사진을 기록해 주세요.' : '현재 피부 이야기를 들려주세요.'} step={step} onBack={step === 2 ? () => setStep(1) : null} /><section className="flow-body section-shell">{step === 1 ? <article className="form-card"><p className="entry-kicker">IMAGE RECORD</p><h2>피부 촬영 또는 이미지 업로드 <b>필수</b></h2><p>사진은 분석하거나 서버로 전송하지 않으며, 이 탭에서만 미리보기로 사용됩니다.</p><ImageInput value={image} onChange={setImage} label="피부 사진" /><button className="cta" disabled={!image} onClick={() => setStep(2)}>다음: 피부 정보 기록 <span>→</span></button></article> : <article className="form-card"><p className="entry-kicker">SKIN QUESTIONNAIRE</p><h2>피부 정보 기록</h2><p>README의 심층 설문 초안을 바탕으로 한 기록이에요. 선택지는 추후 확정될 수 있습니다.</p><div className="question-list">{skinQuestions.map(([key, label, detail, type]) => <label key={key} className="field"><span>{label}{['concern', 'reaction', 'factor', 'goal'].includes(key) && <b>필수</b>}</span>{type === 'select' ? <select value={answers[key] || ''} onChange={(e) => setAnswer(key, e.target.value)}><option value="">선택해 주세요</option>{detail.split('|').map((option) => <option key={option}>{option}</option>)}</select> : <input value={answers[key] || ''} onChange={(e) => setAnswer(key, e.target.value)} placeholder={detail} />}</label>)}</div>{notice && <p className="form-error">{notice}</p>}<button className="cta" onClick={() => { if (!requiredReady) setNotice('필수 항목과 피부 사진을 확인해 주세요.'); else setStep(3) }}>입력 내용 확인 <span>→</span></button></article>}</section></main>
}

function ProductForm({ product, onSave, onCancel }) {
  const [draft, setDraft] = useState(product || { name: '', brand: '', type: '', ingredients: '', date: '', inUse: '', effect: '', reason: '', note: '' })
  const [image, setImage] = useState(product?.image || null)
  const [error, setError] = useState('')
  const change = (key, value) => setDraft((current) => ({ ...current, [key]: value }))
  return <article className="form-card cabinet-form"><p className="entry-kicker">{product ? 'EDIT PRODUCT' : 'ADD PRODUCT'}</p><h2>{product ? '제품 정보 수정' : '화장품 직접 등록'}</h2><div className="product-form"><label className="field"><span>제품명 <b>필수</b></span><input value={draft.name} onChange={(e) => change('name', e.target.value)} placeholder="제품명을 입력해 주세요" /></label><label className="field"><span>브랜드명 <i>선택</i></span><input value={draft.brand} onChange={(e) => change('brand', e.target.value)} /></label><label className="field"><span>제품 유형 <i>선택</i></span><select value={draft.type} onChange={(e) => change('type', e.target.value)}><option value="">선택해 주세요</option>{productTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label className="field"><span>주요 성분 <i>선택</i></span><input value={draft.ingredients} onChange={(e) => change('ingredients', e.target.value)} placeholder="직접 기록할 수 있어요" /></label><label className="field"><span>구매 또는 개봉 시기 <i>선택</i></span><input type="month" value={draft.date} onChange={(e) => change('date', e.target.value)} /></label><label className="field"><span>현재 사용 여부 <i>선택</i></span><select value={draft.inUse} onChange={(e) => change('inUse', e.target.value)}><option value="">선택해 주세요</option><option>사용 중</option><option>현재 사용하지 않음</option></select></label><label className="field wide"><span>사용했을 때 피부 반응이나 효과 <i>선택</i></span><textarea value={draft.effect} onChange={(e) => change('effect', e.target.value)} /></label><label className="field"><span>계속 사용하지 않게 된 이유 <i>선택</i></span><select value={draft.reason} onChange={(e) => change('reason', e.target.value)}><option value="">선택해 주세요</option>{abandonReasons.map((reason) => <option key={reason}>{reason}</option>)}</select></label><label className="field"><span>추가 메모 <i>선택</i></span><textarea value={draft.note} onChange={(e) => change('note', e.target.value)} /></label></div><ImageInput value={image} onChange={setImage} tone="cabinet" label="제품 이미지" /><div className="form-actions"><button className="cta" onClick={() => { if (!draft.name.trim()) setError('제품명은 필수 입력 항목입니다.'); else onSave({ ...draft, id: product?.id || crypto.randomUUID(), image }) }}>{product ? '수정 저장' : '제품 등록'} <span>→</span></button>{onCancel && <button className="text-button" onClick={onCancel}>취소</button>}</div>{error && <p className="form-error">{error}</p>}</article>
}

function CabinetFlow() {
  const [products, setProducts] = useState(() => loadCabinetRecords())
  const [editing, setEditing] = useState(null)
  useEffect(() => { saveCabinetRecords(products.map(({ image, ...product }) => product)) }, [products])
  const save = (product) => { setProducts((all) => all.some((item) => item.id === product.id) ? all.map((item) => item.id === product.id ? product : item) : [...all, product]); setEditing(null) }
  const remove = (id) => setProducts((all) => all.filter((product) => product.id !== id))
  return <main className="flow-page cabinet"><FlowHeader tone="cabinet" title="내 화장대를 기록해 주세요." step={editing ? 2 : 1} onBack={editing ? () => setEditing(null) : null} /><section className="flow-body section-shell">{editing ? <ProductForm product={editing === 'new' ? null : editing} onSave={save} onCancel={() => setEditing(null)} /> : <><div className="list-heading"><div><p className="entry-kicker">MY PRODUCTS</p><h2>등록한 화장품 <b>{products.length}</b>개</h2></div><div className="list-actions"><a className="cta secondary" href="/integrated-review">통합 정보 확인</a><button className="cta" onClick={() => setEditing('new')}>새 제품 추가 <span>+</span></button></div></div>{products.length ? <div className="product-list">{products.map((product) => <article className="product-card" key={product.id}>{product.image?.url ? <img src={product.image.url} alt={`${product.name} 이미지`} /> : <div className="product-image">⌂</div>}<div><p>{product.type || '제품 유형 미입력'}</p><h3>{product.name}</h3><span>{product.brand || '브랜드 미입력'}</span>{product.inUse && <small>{product.inUse}</small>}</div><div className="card-actions"><button className="text-button" onClick={() => setEditing(product)}>수정</button><button className="text-button danger" onClick={() => remove(product.id)}>삭제</button></div></article>)}</div> : <article className="empty-cabinet"><span>⌂</span><h2>아직 등록한 화장품이 없어요.</h2><p>내 화장대에 있는 제품부터 천천히 기록해 보세요.</p><button className="cta secondary" onClick={() => setEditing('new')}>첫 제품 등록하기 <span>→</span></button></article>}<p className="privacy-note">제품 정보는 이 브라우저에만 임시 저장됩니다. 제품 이미지와 실제 성분 분석은 저장·연동하지 않습니다.</p></>}</section></main>
}

function IntegratedReview() {
  const skin = loadSkinRecord()
  const products = loadCabinetRecords()
  const answers = skin.answers || {}
  const skinReady = Boolean(answers.concern && answers.reaction && answers.factor && answers.goal)
  const cabinetReady = products.length > 0
  return <main className="flow-page integrated"><header className="site-header start-header"><a className="logo" href="/">glow<span>day</span></a><a className="back-link" href="/">← 랜딩페이지로 돌아가기</a></header><section className="integration-hero section-shell"><p className="eyebrow"><span /> INTEGRATED REVIEW</p><h1>피부와 화장대를<br /><em>한 흐름으로</em> 확인해요.</h1><p>기록된 정보만 함께 정리했어요. 실제 분석이나 추천은 아직 진행하지 않습니다.</p></section><section className="integration-status section-shell"><article className={skinReady ? 'status-card ready skin' : 'status-card skin'}><span>01</span><div><b>피부 정보</b><p>{skinReady ? '피부 설문 기록이 준비되었어요.' : '필수 피부 설문 기록이 필요해요.'}</p></div><a href="/skin-diagnosis">{skinReady ? '확인·수정' : '피부 정보 입력'} →</a></article><article className={cabinetReady ? 'status-card ready cabinet' : 'status-card cabinet'}><span>02</span><div><b>화장대 정보</b><p>{cabinetReady ? `${products.length}개 제품이 등록되어 있어요.` : '등록한 화장품이 없어요.'}</p></div><a href="/my-cabinet">{cabinetReady ? '확인·수정' : '제품 등록'} →</a></article></section><section className="integration-grid section-shell"><article className="integration-card skin"><div className="integration-card-head"><div><p className="entry-kicker">SKIN RECORD</p><h2>피부 정보</h2></div><a className="text-button" href="/skin-diagnosis">수정하기 →</a></div><p className="photo-note">피부 사진은 브라우저 탭에만 남아 저장되지 않습니다. 사진 확인 또는 분석 전에는 다시 등록해 주세요.</p><dl>{skinQuestions.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{answers[key] || <span className="empty-value">입력하지 않음</span>}</dd></div>)}</dl></article><article className="integration-card cabinet"><div className="integration-card-head"><div><p className="entry-kicker">CABINET RECORD</p><h2>화장대 정보</h2></div><a className="text-button" href="/my-cabinet">수정하기 →</a></div>{cabinetReady ? <div className="integration-products">{products.map((product) => <article key={product.id}><h3>{product.name}</h3><p>{product.brand || '브랜드 미입력'} · {product.type || '유형 미입력'}</p><dl><div><dt>주요 성분</dt><dd>{product.ingredients || '입력하지 않음'}</dd></div><div><dt>사용 여부</dt><dd>{product.inUse || '입력하지 않음'}</dd></div><div><dt>사용 경험</dt><dd>{product.effect || '입력하지 않음'}</dd></div><div><dt>사용하지 않게 된 이유</dt><dd>{product.reason || '입력하지 않음'}</dd></div></dl></article>)}</div> : <div className="integration-empty"><p>화장대에 등록한 제품이 없어요.</p><a className="cta secondary" href="/my-cabinet">화장품 등록하기 <span>→</span></a></div>}</article></section><section className={`analysis-entry section-shell ${skinReady && cabinetReady ? 'ready' : ''}`}><div><p className="entry-kicker">NEXT STEP</p><h2>{skinReady && cabinetReady ? '피부와 화장대를 함께 살펴볼 준비가 되었어요.' : '통합 확인을 위해 두 가지 정보가 모두 필요해요.'}</h2><p>{skinReady && cabinetReady ? '지금 내 피부에 맞는 화장품 활용 가능성을 확인하는 다음 단계로 이어질 수 있습니다.' : !skinReady ? '피부 설문을 먼저 완성해 주세요.' : '화장품을 한 개 이상 등록해 주세요.'}</p></div>{skinReady && cabinetReady ? <button className="cta" type="button" onClick={() => window.alert('통합 분석 기능은 준비 중입니다. 현재는 입력 정보만 확인할 수 있어요.')}>통합 분석 준비 화면 <span>→</span></button> : <a className="cta" href={skinReady ? '/my-cabinet' : '/skin-diagnosis'}>{skinReady ? '화장품 등록하기' : '피부 정보 입력'} <span>→</span></a>}</section></main>
}

const analysisSteps = ['피부 정보 확인', '피부 고민 및 민감도 분석', '보유 화장품과 사용 경험 확인', '피부 정보와 화장품의 연관성 분석', '맞춤 스킨케어 솔루션 생성']

function productInsight(product, answers) {
  if ((product.reason || '').includes('트러블')) return ['주의가 필요한 제품', '기록된 피부 반응을 고려해, 피부 컨디션이 편안한 날 낮은 빈도부터 다시 확인해 보세요.']
  if (product.inUse === '현재 사용하지 않음' || product.reason) return ['사용 방법을 조정해볼 제품', '사용감과 경험을 기준으로 저녁 루틴에서 한 제품씩 천천히 활용해 보세요.']
  return ['현재 루틴에서 활용하기 좋은 제품', '현재 사용 중인 기록을 바탕으로 기본 루틴 안에서 한 겹씩 활용해 보세요.']
}

function AnalysisDemo() {
  const answers = loadSkinRecord().answers || {}
  const products = loadCabinetRecords()
  const ready = Boolean(answers.concern && answers.reaction && answers.factor && answers.goal && products.length)
  const [step, setStep] = useState(0)
  const [report, setReport] = useState(false)
  useEffect(() => {
    if (!ready || report) return undefined
    const timer = window.setTimeout(() => step === analysisSteps.length - 1 ? setReport(true) : setStep(step + 1), 650)
    return () => window.clearTimeout(timer)
  }, [step, report, ready])
  if (!ready) return <main className="analysis-page"><header className="site-header start-header"><a className="logo" href="/">glow<span>day</span></a></header><section className="analysis-progress section-shell"><h1>통합 분석을 시작하려면<br />두 가지 기록이 필요해요.</h1><p>피부 설문 필수 항목과 등록한 화장품을 확인해 주세요.</p><a className="cta" href="/integrated-review">통합 정보 확인하기 <span>→</span></a></section></main>
  if (!report) return <main className="analysis-page"><header className="site-header start-header"><a className="logo" href="/">glow<span>day</span></a><a className="back-link" href="/integrated-review">← 통합 정보로 돌아가기</a></header><section className="analysis-progress section-shell"><p className="eyebrow"><span /> GLOWDAY INTEGRATED ANALYSIS</p><div className="analysis-mark">✦</div><h1>입력한 기록을 바탕으로<br /><em>나만의 흐름</em>을 정리하고 있어요.</h1><p>피부 사진을 분석하거나 외부 데이터에 연결하지 않는 시연용 분석입니다.</p><ol>{analysisSteps.map((item, index) => <li className={index <= step ? 'active' : ''} key={item}><span>{index < step ? '✓' : `0${index + 1}`}</span>{item}<i>{index < step ? '완료' : index === step ? '확인 중' : '대기'}</i></li>)}</ol></section></main>
  const byType = (type) => products.find((product) => product.type === type)?.name
  const toner = byType('토너') || '보유 토너'
  const serum = byType('세럼') || byType('에센스') || '보유 세럼 또는 에센스'
  const cream = byType('크림') || '보습 크림'
  const focus = answers.concern || '기록한 피부 고민'
  const precaution = answers.reaction && answers.reaction !== '겪은 적 없음' ? '과거 피부 반응이 기록되어 있어, 새 제품이나 빈도 변화는 한 번에 하나씩 시도해 보세요.' : '피부 컨디션 변화가 느껴지면 사용 빈도를 조절하며 기록해 보세요.'
  return <main className="analysis-page report-page"><header className="site-header start-header"><a className="logo" href="/">glow<span>day</span></a><a className="back-link" href="/integrated-review">← 입력 정보 확인하기</a></header><section className="report-hero section-shell"><p className="eyebrow"><span /> YOUR GLOWDAY REPORT</p><span className="report-badge">DEMO REPORT</span><h1>피부와 화장대가<br /><em>서로 이해하는 순간.</em></h1><p><b>{focus}</b>을 중심으로, 기록한 제품을 먼저 활용하는 방향을 정리했어요.</p></section><section className="report-summary section-shell"><article><p className="entry-kicker">SKIN SNAPSHOT</p><h2>현재 피부 기록</h2><dl><div><dt>피부 유형</dt><dd>{answers.skinType || '입력하지 않음'}</dd></div><div><dt>주요 고민</dt><dd>{focus}</dd></div><div><dt>민감도</dt><dd>{answers.sensitivity || '입력하지 않음'}</dd></div></dl></article><article className="focus-card"><p className="entry-kicker">CARE FOCUS</p><h2>이번 루틴의 우선순위</h2><div className="focus-pills"><span>{focus}</span><span>{answers.factor || '피부 컨디션 기록'}</span></div><p>입력한 기록을 바탕으로 한 일상 스킨케어 참고 제안이며, 의학적 진단이나 실제 측정 결과가 아닙니다.</p></article></section><section className="report-section section-shell"><div className="report-title"><p className="eyebrow">SKIN CARE GUIDE</p><h2>피부 관리 시 이렇게 살펴보세요.</h2></div><div className="guide-grid"><article><span>01</span><h3>우선 관리할 항목</h3><p>{focus}과 관련해 제품을 여러 개 더하기보다 현재 루틴의 사용감과 반응을 먼저 관찰해 보세요.</p></article><article><span>02</span><h3>사용 시 주의할 점</h3><p>{precaution}</p></article><article><span>03</span><h3>기록의 다음 단계</h3><p>{answers.factor || '피부 컨디션'}처럼 영향을 주는 요인도 함께 살펴보세요.</p></article></div></section><section className="report-section cabinet-report section-shell"><div className="report-title"><p className="eyebrow">MY CABINET, RECONNECTED</p><h2>내 화장대 심폐소생</h2><p>실제 성분·농도는 확인하지 않았으며 사용자가 남긴 기록을 기준으로 정리했어요.</p></div><div className="analysis-products">{products.map((product) => { const [label, note] = productInsight(product, answers); return <article className={label.includes('주의') ? 'caution' : label.includes('조정') ? 'adjust' : 'good'} key={product.id}><span>{label}</span><h3>{product.name}</h3><p>{product.brand || '브랜드 미입력'} · {product.type || '유형 미입력'}</p><dl><div><dt>기록한 성분</dt><dd>{product.ingredients || '입력하지 않음'}</dd></div><div><dt>사용 경험</dt><dd>{product.effect || product.inUse || '입력하지 않음'}</dd></div></dl><b>{note}</b></article> })}</div></section><section className="routine-section section-shell"><div className="report-title"><p className="eyebrow">YOUR ROUTINE</p><h2>이미 가진 제품부터<br /><em>천천히 연결</em>해보세요.</h2></div><div className="routine-grid"><article><span>AM</span><h3>아침 루틴</h3><ol><li>가벼운 세안</li><li>{toner}</li><li>{serum}</li><li>{cream}</li><li>자외선 차단제</li></ol><p>한 겹씩 레이어링하고, 자외선 차단제는 아침 마무리 단계로 고려해 보세요.</p></article><article><span>PM</span><h3>저녁 루틴</h3><ol><li>세안</li><li>{toner}</li><li>{serum}</li><li>{cream}</li></ol><p>새 조합을 한꺼번에 바꾸기보다 제품별 빈도를 조절해 보세요.</p></article></div></section><section className="recommendation section-shell"><div><p className="entry-kicker">BEFORE YOU BUY</p><h2>먼저 가진 제품의 사용감부터 확인해 보세요.</h2><p>현재 기록만으로 새 제품이 꼭 필요하다고 판단하기 어렵습니다. 보유 제품을 충분히 활용한 뒤, 부족한 기능만 제품 유형으로 보완해 보세요.</p></div><a className="cta secondary" href="/my-cabinet">화장대 정보 수정 <span>→</span></a></section><footer className="report-footer"><p>이 리포트는 입력한 설문 및 제품 기록에 기반한 시연용 규칙 결과이며, AI 분석·피부 측정·성분 데이터베이스를 사용하지 않습니다.</p><button className="cta" onClick={() => { setStep(0); setReport(false) }}>현재 기록으로 다시 분석하기 <span>↻</span></button></footer></main>
}

function IntegratedReviewDemo() {
  const skin = loadSkinRecord().answers || {}
  const products = loadCabinetRecords()
  const skinReady = Boolean(skin.concern && skin.reaction && skin.factor && skin.goal)
  const cabinetReady = products.length > 0
  return <main className="flow-page integrated"><header className="site-header start-header"><a className="logo" href="/">glow<span>day</span></a><a className="back-link" href="/">← 랜딩페이지로 돌아가기</a></header><section className="integration-hero section-shell"><p className="eyebrow"><span /> INTEGRATED REVIEW</p><h1>피부와 화장대를<br /><em>한 흐름으로</em> 확인해요.</h1><p>기록된 정보만 함께 정리했어요. 실제 분석이나 추천은 아직 진행하지 않습니다.</p></section><section className="integration-status section-shell"><article className={skinReady ? 'status-card ready skin' : 'status-card skin'}><span>01</span><div><b>피부 정보</b><p>{skinReady ? '피부 설문 기록이 준비되었어요.' : '필수 피부 설문 기록이 필요해요.'}</p></div><a href="/skin-diagnosis">{skinReady ? '확인·수정' : '피부 정보 입력'} →</a></article><article className={cabinetReady ? 'status-card ready cabinet' : 'status-card cabinet'}><span>02</span><div><b>화장대 정보</b><p>{cabinetReady ? `${products.length}개 제품이 등록되어 있어요.` : '등록한 화장품이 없어요.'}</p></div><a href="/my-cabinet">{cabinetReady ? '확인·수정' : '제품 등록'} →</a></article></section><section className="analysis-entry section-shell ready"><div><p className="entry-kicker">NEXT STEP</p><h2>{skinReady && cabinetReady ? '피부와 화장대를 함께 살펴볼 준비가 되었어요.' : '통합 확인을 위해 두 가지 정보가 모두 필요해요.'}</h2><p>{skinReady && cabinetReady ? '입력한 피부와 화장대 기록을 바탕으로 시연용 맞춤 리포트를 생성합니다.' : '한쪽 정보만으로 최종 통합 분석은 진행하지 않습니다.'}</p></div>{skinReady && cabinetReady ? <a className="cta" href="/analysis-demo">통합 분석 시작하기 <span>→</span></a> : <a className="cta" href={skinReady ? '/my-cabinet' : '/skin-diagnosis'}>{skinReady ? '화장품 등록하기' : '피부 정보 입력'} <span>→</span></a>}</section></main>
}

function IntegratedReviewComplete() {
  const answers = loadSkinRecord().answers || {}
  const products = loadCabinetRecords()
  const skinReady = Boolean(answers.concern && answers.reaction && answers.factor && answers.goal)
  const cabinetReady = products.length > 0
  return <main className="flow-page integrated"><header className="site-header start-header"><a className="logo" href="/">glow<span>day</span></a><a className="back-link" href="/">← 랜딩페이지로 돌아가기</a></header><section className="integration-hero section-shell"><p className="eyebrow"><span /> INTEGRATED REVIEW</p><h1>피부와 화장대를<br /><em>한 흐름으로</em> 확인해요.</h1><p>기록된 정보만 함께 정리했어요. 실제 분석이나 추천은 아직 진행하지 않습니다.</p></section><section className="integration-status section-shell"><article className={skinReady ? 'status-card ready skin' : 'status-card skin'}><span>01</span><div><b>피부 정보</b><p>{skinReady ? '피부 설문 기록이 준비되었어요.' : '필수 피부 설문 기록이 필요해요.'}</p></div><a href="/skin-diagnosis">확인·수정 →</a></article><article className={cabinetReady ? 'status-card ready cabinet' : 'status-card cabinet'}><span>02</span><div><b>화장대 정보</b><p>{cabinetReady ? `${products.length}개 제품이 등록되어 있어요.` : '등록한 화장품이 없어요.'}</p></div><a href="/my-cabinet">확인·수정 →</a></article></section><section className="integration-grid section-shell"><article className="integration-card skin"><div className="integration-card-head"><h2>피부 정보</h2><a className="text-button" href="/skin-diagnosis">수정하기 →</a></div><p className="photo-note">피부 사진은 저장되지 않습니다. 사진 확인 또는 분석 전에는 다시 등록해 주세요.</p><dl>{skinQuestions.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{answers[key] || <span className="empty-value">입력하지 않음</span>}</dd></div>)}</dl></article><article className="integration-card cabinet"><div className="integration-card-head"><h2>화장대 정보</h2><a className="text-button" href="/my-cabinet">수정하기 →</a></div>{cabinetReady ? <div className="integration-products">{products.map((product) => <article key={product.id}><h3>{product.name}</h3><p>{product.brand || '브랜드 미입력'} · {product.type || '유형 미입력'}</p><dl><div><dt>주요 성분</dt><dd>{product.ingredients || '입력하지 않음'}</dd></div><div><dt>사용 여부</dt><dd>{product.inUse || '입력하지 않음'}</dd></div><div><dt>사용 경험</dt><dd>{product.effect || '입력하지 않음'}</dd></div><div><dt>사용하지 않게 된 이유</dt><dd>{product.reason || '입력하지 않음'}</dd></div></dl></article>)}</div> : <div className="integration-empty"><p>화장대에 등록한 제품이 없어요.</p><a className="cta secondary" href="/my-cabinet">화장품 등록하기 <span>→</span></a></div>}</article></section><section className={`analysis-entry section-shell ${skinReady && cabinetReady ? 'ready' : ''}`}><div><p className="entry-kicker">NEXT STEP</p><h2>{skinReady && cabinetReady ? '피부와 화장대를 함께 살펴볼 준비가 되었어요.' : '통합 확인을 위해 두 가지 정보가 모두 필요해요.'}</h2><p>{skinReady && cabinetReady ? '입력한 피부와 화장대 기록을 바탕으로 시연용 맞춤 리포트를 생성합니다.' : '한쪽 정보만으로 최종 통합 분석은 진행하지 않습니다.'}</p></div>{skinReady && cabinetReady ? <a className="cta" href="/analysis-demo">통합 분석 시작하기 <span>→</span></a> : <a className="cta" href={skinReady ? '/my-cabinet' : '/skin-diagnosis'}>{skinReady ? '화장품 등록하기' : '피부 정보 입력'} <span>→</span></a>}</section></main>
}

function LandingPage() {
  return (
    <main id="top">
      <Header />
      <section className="hero section-shell">
        <div className="hero-copy"><p className="eyebrow"><span /> YOUR BEAUTY, RECONNECTED</p><h1>화장품을 새로 사기 전에,<br /><em>지금 가진 화장품부터</em><br />확인해보세요.</h1><p className="hero-description">피부를 이해하고, 화장대 속 제품을 다시 연결하는<br className="desktop-break" /> 나만의 AI 뷰티 에이전트 glowday.</p><div className="hero-ctas"><StartButton path="/skin-diagnosis">피부 진단부터 시작하기</StartButton><StartButton path="/my-cabinet" variant="secondary">내 화장대부터 시작하기</StartButton></div><p className="availability">두 가지 시작 경로 모두 <b>준비 중</b>입니다.</p></div>
        <HeroArtwork />
      </section>

      <section className="intro-band" id="story"><p>더 사기 전에, <i>더 잘 쓰는 방법</i>을 찾는 것.</p><span>GLOWDAY’S POINT OF VIEW</span></section>

      <section className="problem section-shell">
        <div className="section-heading"><p className="eyebrow">WHY GLOWDAY</p><h2>SNS 1위 추천템,<br />왜 <em>내 피부에만</em> 안 맞을까요?</h2></div>
        <div className="problem-content"><div className="problem-note"><span className="quote-mark">“</span><p>추천은 넘쳐나지만,<br /><b>내 피부와 내 화장대</b>를 함께<br />봐주는 곳은 드물었어요.</p></div><div className="problem-copy"><p>누군가에게는 인생템인 제품도 내게는 건조함, 답답함, 혹은 방치의 이유가 될 수 있습니다.</p><p>glowday는 새 제품을 권하기 전에 피부 상태와 이미 보유한 제품을 먼저 살펴봅니다. 나에게 맞는 사용 시기와 순서, 주의할 조합을 찾아 불필요한 구매를 줄이는 것이 출발점입니다.</p><div className="solution-line"><span>glowday solution</span><b>피부 정보 + 보유 화장품 정보</b></div></div></div>
      </section>

      <section className="how-section" id="how"><div className="section-shell"><div className="how-heading"><div><p className="eyebrow">HOW IT WORKS</p><h2>둘 중 무엇부터 시작해도,<br /><em>답은 하나로 이어집니다.</em></h2></div><p>피부와 화장대, 두 가지 정보를 결합해<br />더 나다운 스킨케어 해답을 만듭니다.</p></div><div className="route-map"><div className="route route-skin"><span className="route-icon">◌</span><small>START A</small><b>피부 진단부터</b><p>피부 사진과 설문으로<br />지금의 컨디션을 살펴봐요.</p></div><div className="route route-cabinet"><span className="route-icon">⌂</span><small>START B</small><b>내 화장대부터</b><p>보유 제품과 사용 경험을<br />먼저 기록해요.</p></div><div className="merge"><span>+</span><small>AI INTEGRATED ANALYSIS</small></div></div><ol className="steps">{steps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

      <section className="features section-shell" id="features"><div className="feature-heading"><p className="eyebrow">BEYOND A RECOMMENDATION</p><h2>내 피부와 화장대가<br /><em>서로 이해하는 순간.</em></h2><p>진단부터 루틴까지, 흩어진 뷰티 경험을 하나로 연결합니다.</p></div><div className="feature-grid">{featureCards.map((feature, index) => <article className={`feature-card ${feature.tone}`} key={feature.title}><div className="feature-number">0{index + 1}</div><div className="feature-icon">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.text}</p><span className="feature-arrow">↗</span></article>)}</div></section>

      <section className="cabinet-highlight"><div className="section-shell cabinet-inner"><div><p className="eyebrow">THE GLOWDAY DIFFERENCE</p><h2>이미 사버린<br /><em>실패템도,</em> <br />다른 계절엔 다를 수 있어요.</h2><p className="cabinet-text">피부 컨디션과 계절, 다른 제품과의 조합을 함께 살펴<br className="desktop-break" /> 화장대 속 제품의 새로운 역할을 제안합니다.</p></div><div className="cabinet-window"><div className="window-header"><span>my glow cabinet</span><i>···</i></div><div className="shelf"><div className="jar tall"><span>serum</span></div><div className="jar round"><span>cream</span></div><div className="jar tube"><span>spf</span></div></div><div className="window-insight"><span>✦</span><p><b>오늘은 이 조합이 좋아요</b><br />가볍게, 저녁 루틴으로</p></div></div></div></section>

      <section className="plans section-shell" id="plans"><div className="plans-heading"><p className="eyebrow">MEMBERSHIP</p><h2>나에게 필요한 만큼,<br /><em>천천히 시작하세요.</em></h2><p>가격과 세부 이용 범위는 현재 기획 검토 중입니다.</p></div><div className="plan-grid"><article className="plan-card"><p className="plan-kicker">FREE</p><h3>첫 만남을 위한<br />기본 케어</h3><p className="plan-price">가격 검토 중</p><ul><li>AI 렌즈 피부 진단 <small>월 3회 기획안</small></li><li>기본 제품 추천</li><li>방치템 활용 레시피 <small>최대 3개 기획안</small></li></ul><button type="button" className="text-button" onClick={() => window.alert('요금제 세부 구성은 준비 중입니다.')}>구성 안내 준비 중 <span>→</span></button></article><article className="plan-card premium"><p className="plan-kicker">PREMIUM <span>PREVIEW</span></p><h3>더 깊고 꾸준한<br />맞춤 관리</h3><p className="plan-price">가격 검토 중</p><ul><li>AI 렌즈 진단 횟수 무제한</li><li>맞춤 제품 및 조합 추천</li><li>날씨·환경 연동 루틴</li><li>맞춤형 샘플 키트 배송 <small>구상 단계</small></li></ul><button type="button" className="text-button" onClick={() => window.alert('요금제 세부 구성은 준비 중입니다.')}>구성 안내 준비 중 <span>→</span></button></article></div><p className="plan-disclaimer">요금제의 가격, 샘플 구성, 세부 이용 한도는 확정 전이며 변경될 수 있습니다.</p></section>

      <section className="closing"><div className="section-shell closing-inner"><p className="eyebrow">YOUR ROUTINE, REIMAGINED</p><h2>새로운 화장품보다<br /><em>나를 더 잘 아는 루틴</em>을.</h2><p>내 피부와 내 화장대의 이야기를 glowday에서 시작해보세요.</p><div className="hero-ctas"><StartButton path="/skin-diagnosis">피부 진단부터 시작하기</StartButton><StartButton path="/my-cabinet" variant="secondary light">내 화장대부터 시작하기</StartButton></div></div></section>
      <footer><div className="footer-top"><a className="logo" href="#top">glow<span>day</span></a><p>내 피부와 화장대에 맞춘<br />AI 뷰티 에이전트</p></div><div className="footer-bottom"><span>© glowday. All rights reserved.</span><div><button type="button" onClick={() => window.alert('서비스 및 정책 안내는 준비 중입니다.')}>서비스 소개</button><button type="button" onClick={() => window.alert('개인정보 처리 안내는 준비 중입니다.')}>개인정보 처리 안내</button></div></div></footer>
    </main>
  )
}

function App() {
  if (window.location.pathname === '/skin-diagnosis') return <SkinFlow />
  if (window.location.pathname === '/my-cabinet') return <CabinetFlow />
  if (window.location.pathname === '/integrated-review') return <IntegratedReviewComplete />
  if (window.location.pathname === '/analysis-demo') return <AnalysisDemo />
  return <LandingPage />
}

export default App
