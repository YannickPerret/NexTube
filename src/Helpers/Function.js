export const formatTime = (seconde) =>{
    seconde = Number(seconde)
    let hours = Math.floor(seconde / 3600)
    let minutes = Math.floor(seconde % 3600 /60)
    seconde = Math.floor(seconde % 3600 % 60)


    const hdisplay = hours > 0 ? hours + (hours == 1 ? ' heure ' : ' heures ') : "";
    const mDisplay = minutes > 0 ? minutes + (minutes == 1 ? ' min ' : ' mins ') : "";
    const sdisplay = seconde > 0 ? seconde + (seconde == 1 ? ' sec ' : ' secs ') : "";
    console.log(hours)

    return hdisplay + mDisplay + sdisplay
}