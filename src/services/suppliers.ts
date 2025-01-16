import { SUPPLIERS_ENDPOINT } from "@/internal/constants";
import { type Supplier } from "@/types/supplier";

export async function getSuppliers(): Promise<Supplier[]> {
  try {
    const response = await fetch(SUPPLIERS_ENDPOINT);
    if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
    }
    const data = await response.json();

    return data as Supplier[];
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

export function validateSupplier(data: any): asserts data is Supplier {
  if ("id" in data && "name" in data && "address" in data && "zip" in data && "city" in data && "country" in data) {
    return;
  }

  throw new Error("Provided object is not a Supplier");
}
