export default function formatClockTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60
    return `${minutes}:${String(seconds).padStart(2, '0')}`
}