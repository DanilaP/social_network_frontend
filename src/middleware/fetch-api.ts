import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';

export async function fetchWithAuth(
    input: RequestInfo | URL,
    init?: RequestInit
): Promise<Response> {
    
    const cookieStore = cookies();
    const cookieString = (await cookieStore).getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');
    
    const response = await fetch(input, {
        ...init,
        credentials: "include",
        headers: {
            ...init?.headers,
            Cookie: cookieString 
        }
    });
    
    if (response.status === 401) {
        const headersList = await headers();
        const pathname = headersList.get('x-invoke-path') || '';
        
        if (!pathname.includes('/auth')) {
            redirect('/auth/sign-in');
        }
    }

    return response;
}