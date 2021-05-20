import {
    apiDomain,
    requestHeaderWithBodyAfterAuthentication,
    requestHeaderWithoutBodyAfterAuthentication
} from "../components/requestHeaders";

const RFIDomainUrl = apiDomain + "/rfis"

export const getAllRFIs = async (token) => {
    return await fetch( RFIDomainUrl + "/", requestHeaderWithoutBodyAfterAuthentication(token))
}

export const saveRFI = async (body, token) => {
    return await fetch( RFIDomainUrl + "/", requestHeaderWithBodyAfterAuthentication("POST", body, token))
}