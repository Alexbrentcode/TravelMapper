import axios from "axios";
const baseUrl = 'https://geocode.maps.co/'

const prepareInput = (inputStr: string) => {
    return inputStr.replace(/ /g, '+');
}

export const getGeoCodeByString = async (inputParams: string) => {
    try{
        const response = await axios.get(`${baseUrl}search?q=${prepareInput(inputParams)}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export const getGeoCodeByCoordinates = async (lat: number, lon: number) => {
    try{
        const response = await axios.get(`${baseUrl}reverse?lat=${lat}&lon=${lon}`)
        console.log(response.data) 
        return response.data
    } catch (err) {
        console.error(err)
    }
}
