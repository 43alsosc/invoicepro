// Importing z from the zod library
import { z } from 'zod';

// Importing the query function from the db module
// import { query } from '@/db';

// Importing revalidatePath and unstable_noStore as noStore functions from next/cache module
import { revalidatePath } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';

// Importing redirect function from next/navigation module
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';

// Defining a FormSchema using zod, specifying the shape of form fields
const FormSchema = z.object({
    customerId: z.string({  // Defines customerId as a string with custom error message
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce  // Defines amount as a coerced number
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),  // Ensures amount is greater than 0
    status: z.enum(['pending', 'paid'], {  // Defines status as an enum with specified values
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),  // Defines date as a string
    customerName: z.string().optional(),  // Defines customerName as a string
    email: z.string().optional(),  // Defines email as a string
    image_url: z.string().optional(),  // Defines image_url as a string
});

// Creating CreateInvoice schema by omitting id and date fields from FormSchema
const CreateInvoice = FormSchema.omit({ id: true, date: true });
// const CreateCustomer = FormSchema.omit({ id: true });

// Creating UpdateInvoice schema by omitting id and date fields from FormSchema
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// Defining State type, which includes optional errors and message properties
export type State = {
    errors?: {
        id?: string[];
        amount?: string[];
        status?: string[];
        customerName?: string[];
        email?: string[];
        image_url?: string[];
    };
    message?: string | null;
};

// Asynchronous function to create an invoice, takes previous state and form data as parameters
// Oppdatert for SupaBase
// export async function createInvoice(prevState: State, formData: FormData) {

//     console.log("DETTE ER I CREATEINVOICE")

//     const formObject = Object.fromEntries(formData.entries());
//     console.log(formObject)

//     // Before validating the formObject, add the date
//     formObject.date = new Date().toISOString();

//     // 
//     const validatedData = FormSchema.parse(formObject);
//     console.log(validatedData)

//     // Parsing and validating form data against CreateInvoice schema
//     console.log("Formdata: ", formData);
//     const validatedFields = CreateInvoice.safeParse({
//         customerId: formData.get('customerId') as string,
//         amount: parseFloat(formData.get('amount') as string),
//         status: formData.get('status') as 'pending' | 'paid' | 'overdue' // Assuming status is always one of these values
//     });


//     console.log("Validated Fields: ", validatedFields);  // Log validatedFields

//     // Handling validation errors
//     if (!validatedFields.success) {
//         console.log("missing fields")
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Missing Fields. Failed to Create Invoice.',
//         };
//     }

//     // Destructuring validated data
//     const { customerId, amount, status } = validatedFields.data;

//     const supabase = createClient();

//     try {
//         // Fetching customer details from the database using Supabase
//         const { data: customers, error } = await supabase
//             .from('customers')
//             .select('customerName, image_url, email')
//             .eq('id', customerId);

//         if (error || !customers || customers.length === 0) {
//             console.log("No customer found with ID:", customerId);
//             throw new Error(`No customer found with ID: ${customerId}`);
//         }

//         const { customerName, image_url, email } = customers[0];

//         // Inserting the invoice using Supabase
//         const { data: insertedInvoice, error: insertError } = await supabase
//             .from('invoices')
//             .insert([
//                 {
//                     customerId,
//                     customerName,
//                     image_url,
//                     email,
//                     amount,
//                     dueBy: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
//                     status
//                 }
//             ]);

//         if (insertError) {
//             console.error('Database Error:', insertError);
//             return {
//                 message: 'Database Error: Failed to Create Invoice.',
//             };
//         }
//     } catch (error) {
//         // Handling database errors
//         console.error('Database Error:', error);
//         return {
//             message: 'Database Error: Failed to Create Invoice.',
//         };
//     }

//     // Revalidating path and redirecting
//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
// }

// Asynchronous function to update an invoice, takes id, previous state, and form data as parameters
// export async function updateInvoice(
//     id: string,
//     prevState: State,
//     formData: FormData,
// ) {
//     // Parsing and validating form data against UpdateInvoice schema
//     const validatedFields = UpdateInvoice.safeParse({
//         customerId: formData.get('customerId'),
//         amount: formData.get('amount'),
//         status: formData.get('status'),
//     });

//     // Handling validation errors
//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Missing Fields. Failed to Update Invoice.',
//         };
//     }

//     // Destructuring validated data
//     const { customerId, amount, status } = validatedFields.data;
//     const amountInCents = amount * 100;  // Converting amount to cents

//     try {
//         // Constructing SQL prepared statement for update
//         const preparedStatement = `UPDATE invoices
//             SET customer_id = ?, amount = ?, status = ?
//             WHERE id = ?`;
//         const values = [customerId, amountInCents, status, id];
//         // Executing SQL query with prepared statement and values
//         await query(preparedStatement, values);
//     } catch (error) {
//         // Handling database errors
//         console.error('Database Error:', error);
//         return { message: 'Database Error: Failed to Update Invoice.' };
//     }

//     // Revalidating path and redirecting
//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
// }

// Asynchronous function to fetch an invoice by id
// export async function fetchInvoiceById(id: string) {
//     noStore();  // Indicating no caching for this request
//     try {
//         // Querying database to fetch invoice data
//         const data = await query(`SELECT invoices.id, invoices.customerName, invoices.amount, invoices.status FROM invoices WHERE invoices.id = ?`, [id]);
//         // Mapping and formatting fetched invoice data
//         const invoice = data.map((invoice: { amount: any; }) => ({
//             ...invoice,
//             amount: invoice.amount,
//         }));

//         console.log(invoice);  // Logging fetched invoice data
//         return invoice[0];  // Returning first item of fetched invoices
//     } catch (error) {
//         // Handling database errors
//         console.error('Database Error:', error);
//         throw new Error('Failed to fetch invoice.');
//     }
// }

// Asynchronous function to fetch all customers
export async function fetchCustomers() {
    const supabase = createClient();

    const { data, error } = await supabase.from("customers").select();

    if (error) {
        console.error("Error fetching customers:", error);
        return [];
    }

    return data;

}

// export async function createCustomer(prevState: State, formData: FormData) {
//     // Parsing and validating form data against CreateInvoice schema
//     const validatedFields = CreateCustomer.safeParse({
//         customerName: formData.get('customerName'),
//         image_url: formData.get('image_url'),
//         email: formData.get('email'),
//     });

//     // Handling validation errors
//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Missing Fields. Failed to Create Invoice.',
//         };
//     }

//     // Destructuring validated data
//     const { customerName, image_url, email
//     } = validatedFields.data;

//     try {
//         // Constructing SQL prepared statement for insertion
//         const preparedStatement = `INSERT INTO  customers
//             (customerName, image_url, email) VALUES (?, ?, ?)`;
//         const values = [customerName, image_url, email];
//         // Executing SQL query with prepared statement and values
//         await query(preparedStatement, values);
//     } catch (error) {
//         // Handling database errors
//         return {
//             message: 'Database Error: Failed to Create Customer.',
//         };
//     }

//     // Revalidating path and redirecting
//     revalidatePath('/dashboard/customers');
//     redirect('/dashboard/customers');
// }

