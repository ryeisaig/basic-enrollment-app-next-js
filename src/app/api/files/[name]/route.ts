import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { name: string } }) {    
    const file = await readFile(`/upload_files/${params.name}`);
    const response = new NextResponse(file);
    response.headers.set('content-type', 'image/*');
    return response;
}