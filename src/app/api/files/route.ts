import { validateRequest } from '@/services/CoreService';
import { writeFile } from 'fs/promises'

export async function POST(req: any) {
    await validateRequest(req);

    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return Response.json({ success: false})
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `/upload_files/${file.name}`;
    await writeFile(path, buffer);

    return Response.json({ success: true, path: file.name })
}