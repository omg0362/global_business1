const SKIN_KEY = 'glowday.skin-record.v1'
const CABINET_KEY = 'glowday.cabinet-records.v1'

function read(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const loadSkinRecord = () => {
  const record = read(SKIN_KEY, {})
  const answers = record.answers
  if (!answers || answers.reactionType || !answers.reaction) return record
  const reactionType = answers.reaction === '겪은 적 없음'
    ? '특별한 반응 경험 없음'
    : answers.reaction.includes('레티놀')
      ? '레티놀 계열'
      : answers.reaction.includes('비타민')
        ? '비타민 C 계열'
        : answers.reaction.includes('각질')
          ? '각질 제거 성분(AHA/BHA 등)'
          : '기타'
  return { ...record, answers: { ...answers, reactionType } }
}
export const saveSkinRecord = (record) => write(SKIN_KEY, record)
export const loadCabinetRecords = () => read(CABINET_KEY, [])
export const saveCabinetRecords = (records) => write(CABINET_KEY, records)
