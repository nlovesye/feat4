const grades = ['C', 'B', 'A', 'S']

export const grade = function (val = 1) {
    const i = val - 1
    return grades[i] || ''
}

// 获取本地localStorage
export const getLocal = function (key) {
    return localStorage.getItem(key)
}

// 设置本地localStorage
export const setLocal = function (key, val) {
    localStorage.setItem(key, val)
}

// 删除本地localStorage
export const removeLocal = function (key) {
    localStorage.removeItem(key)
}
