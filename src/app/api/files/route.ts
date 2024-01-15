import { validateRequest } from '@/services/CoreService';
import { writeFile } from 'fs/promises'
import { v4 as uuid } from 'uuid';

export async function POST(req: any) {
    const auth = await validateRequest();

    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return Response.json({ success: false})
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const randomString = uuid();
    const filePath = `${randomString}_${file.name}`;
    const path = `/upload_files/${filePath}`;
    await writeFile(path, buffer);

    return Response.json({ success: true, path: filePath })
}