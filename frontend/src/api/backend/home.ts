import { authenticatedFetch } from "./apiClient"
import { Visit, VisitState } from "./visits"

export interface Home {
    state: VisitState
    visit: Visit | null
    days_till: number | null
    today_schedule: number[] | null
}


export async function getHome(): Promise<Home> {
    const response = await authenticatedFetch('/home', {
        method: 'GET',
    })
    if (!response.ok) {
        throw new Error('Failed to get home')
    }
    const home: Home = await response.json()
    return home
}