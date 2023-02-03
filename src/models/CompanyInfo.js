import { Schema, model, models } from 'mongoose';

const companySchema = new Schema(
	{
		industry: {
			String,
			type: String,
			required: [true, 'Title is required'],
			unique: false,
			trim: true,
			maxlength: [100, 'Title must be less than 40 characters']
		},

		companySize: {
			type: String,
			required: true,
			trim: true,
			maxlength: [200, 'Description must be less than 200 characters']
		},
		valuesProduct: {
			type: Array,
			default: []
		},
		valuesCustomer: {
			type: Array,
			default: []
		},
    valuesFinancials: {
			type: Array,
			default: []
		},
    valuesGoToMarket: {
			type: Array,
			default: []
		},
    valuesSuppliers: {
			type: Array,
			default: []
		},
    valuesLogisticsSystems: {
			type: Array,
			default: []
		},
    averagePerClass: {
			type: Array,
			default: []
		},
    average: {
			type: Number
		},
		_id: {
			type: Schema.Types.ObjectId,
			auto: true
		}
	},
	{
		timestamps: true, //<- Añade fecha de creación y última modificación
		versionKey: false
	}
);

export default models.company || model('company', companySchema);
