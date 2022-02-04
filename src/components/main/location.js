import { apiKeys} from '../constant/constant';

export const Location = (n) => {
    function success(position) {
        const { latitude, longitude } = position.coords
        fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKeys}`)
            .then(res => res.json())
            .then(
                (result) => {
                    n(result[0].name)
                    console.log( n(result[0].name))
                },
                (error) => {
                    return error;
                }
            )
    }
    navigator.geolocation.getCurrentPosition(success)
}