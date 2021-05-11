import BaseService from './BaseService';
import { PDF_UPLOAD_ROUTE } from './ServiceConstants';
import Opinion from '../interfaces/Opinion';

class PdfService extends BaseService {
    uploadPdf(pdf: File): Promise<Opinion[]> {
        const formData = new FormData();
        formData.append('file', pdf);
        return this.axios.post(PDF_UPLOAD_ROUTE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((r) => r.data as Opinion[]);
    }
}

export default PdfService;
