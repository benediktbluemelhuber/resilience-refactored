/* import {dbConnect} from '../../../utils/mongoose'
import Task from '../../../models/Task' */
//↓ Ahora puedo importar directamente sin los ../../ gracias a la configuración ALIASES hecha en el archivo jsconfig.json (buscar documentación oficial) NOTA: Recuerda recargar npm run dev para que lea correctamente los datos, ya que jsconfig.json es un archivo de configuración inicial (primario-fuera de cualquier carpeta o documento)
import { dbConnect } from "utils/mongoose";
import CompanyInfo from '../../../models/CompanyInfo';

dbConnect();

export default async (req, res) => {
    const { method } = req;
    console.log(method)
    switch (method) {
        case 'POST':
            try {
                const companyInfo = await CompanyInfo.create(req.body);
                res.status(201).json({ success: true, data: companyInfo });
             } catch (error) {
                if (error.code === 11000) {
                   return res.status(400).json({ success: false, error: 'Company already exists' });
                }
                res.status(400).json({ success: false, error: 'Could not create company' });
             }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
