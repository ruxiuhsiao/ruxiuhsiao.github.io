/**
 * 自已設計的數學函式庫
 * 作者：kChen
 * 版本：0.1
 */

/**
 * 產生一個從 start 到 end 的整數亂數
 * @param {number} start 亂數的啟始數字
 * @param {number} end 亂數的結束數字
 * @returns {number} 一個從 start 到 end 的整數亂數
 */
var RandomInt = (start, end) => {
    // 計算放大的倍數
    let n = end - start + 1
    // 放大
    r = Math.random() * n
    // 無條件捨去
    r = Math.floor(r)
    // 位移到 start
    r = r + start
    return r
}