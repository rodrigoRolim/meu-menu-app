import { IsArray, ValidateNested } from "class-validator";
import { CreateOpeningHourInput } from "./create-opening-hour.input";
import { Type } from "class-transformer";

export class CreateEstablishmentInput {
  name: string;                
  phone: string;            
  
  // location
  address: string;         
  city: string;       
  state: string;          
  neighborhood: string;         
  zipCode: string;  
  complement: string;       
  
  // slug
  slug: string;  

  // preparation time in minutes
  estimatedPreparationTime: number
  // prices and taxes
  minOrderAmount: number
  deliveryFee: number

  // working time
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOpeningHourInput)
  businessHours: CreateOpeningHourInput[]

  // accept terms
  acceptedTerms: boolean;

  // status: open, closed, invisible
  isVisible: boolean;
  isOpen: boolean;

  // TODO: logo and conver image
  logoUrl: string;
  coverImageUrl: string;
}