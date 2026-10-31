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

export const loadSkinRecord = () => read(SKIN_KEY, {})
export const saveSkinRecord = (record) => write(SKIN_KEY, record)
export const loadCabinetRecords = () => read(CABINET_KEY, [])
export const saveCabinetRecords = (records) => write(CABINET_KEY, records)
