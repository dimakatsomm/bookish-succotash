// Inventory Types
export interface InventoryRequest {
  tankId: number
  fuelGradeId: string
  fuelGradeName: string
  commodityCode?: string
  volume: number
  temperatureCompensatedVolume?: number
  ullage?: number
  fuelHeight?: number
  waterHeight?: number
  temperature?: number
  waterVolume?: number
  density?: number
}

export interface InventoryResponse {
  responseCode: string
  message: string
  error: boolean
  tankId: number
  status: string
}

export interface InventoryCollectionRequest {
  inventory: InventoryRequest[]
}

export interface InventoryCollectionResponse {
  responseCode: string
  message: string
  error: boolean
  inventory: InventoryResponse[]
}

export interface InventoryStatusResponse extends InventoryRequest {
  status: string
  revenueAuthorityReference: string
  revenueAuthorityMessage: string
  responseCode: string
  message: string
  error: boolean
}

export interface InventoryEventLogResponse {
  statusMessage: string
  statusCode: string
  dateTime: string
  revenueAuthorityReference: string
  revenueAuthorityMessage: string
}

// Invoice Types
export interface InvoiceLineProductFuelDto {
  gradeId: string
  gradeName: string
  tankId: string
  pumpId: string
  nozzleId: string
}

export interface InvoiceLineProductDto {
  productId: string
  productCode: string
  description: string
  unitOfMeasure?: string
  unitPrice: number
  commodityCode?: string
  taxCode: string
  hazardousIndicator?: boolean
  fuel?: InvoiceLineProductFuelDto
}

export interface InvoiceLineDiscountDto {
  type: string
  value: number
}

export interface InvoiceLineTaxDto {
  type: string
  percentage: number
  amount: number
  exemptionCode?: string
}

export interface InvoiceLineDto {
  lineType: string
  lineId?: string
  quantity: number
  product: InvoiceLineProductDto
  discount: InvoiceLineDiscountDto
  tax: InvoiceLineTaxDto
}

export interface InvoiceSellerTaxDto {
  countryCode: string
  tin?: string
  ninbrn?: string
  value?: number
}

export interface InvoiceSellerAddressDto {
  street?: string
  city?: string
  postalCode?: string
  countryCode?: string
}

export interface InvoiceSellerContactsDto {
  phone?: string
  email?: string
  contactPerson?: string
}

export interface InvoiceSellerDto {
  industryCode: string
  legalName: string
  tradeName: string
  tax: InvoiceSellerTaxDto
  address: InvoiceSellerAddressDto
  contact: InvoiceSellerContactsDto
}

export interface InvoiceBuyerTaxDto {
  countryCode: string
  tin?: string
  ninbrn?: string
  value?: number
}

export interface InvoiceBuyerAddressDto {
  street?: string
  city?: string
  postalCode?: string
  countryCode?: string
}

export interface InvoiceBuyerContactDto {
  phone?: string
  email?: string
  contactPerson?: string
}

export interface InvoiceBuyerDto {
  buyerType: string
  name: string
  passportNumber?: string
  businessName?: string
  tax: InvoiceBuyerTaxDto
  address: InvoiceBuyerAddressDto
  contact: InvoiceBuyerContactDto
}

export interface InvoiceTotalDto {
  amount: number
  taxAmount: number
  discountAmount: number
  netAmount: number
}

export interface InvoicePaymentBankAccountDto {
  bankName: string
  accountNumber: string
  branchCode?: string
  swiftCode?: string
  iban?: string
}

export interface InvoicePaymentDto {
  dueDate?: string
  terms?: string
  bankAccount: InvoicePaymentBankAccountDto
}

export interface InvoiceDeliveryAddressDto {
  street?: string
  city?: string
  postalCode?: string
  countryCode?: string
}

export interface InvoiceDeliveryDto {
  date?: string
  method?: string
  address: InvoiceDeliveryAddressDto
}

export interface InvoiceRequest {
  documentId: string
  transactionUniqueNumber: string
  documentType: string
  documentNumber: string
  issueDateTime: string
  currency?: string
  lines: InvoiceLineDto[]
  seller: InvoiceSellerDto
  buyer: InvoiceBuyerDto
  priceVatInclusive: string
  totals: InvoiceTotalDto
  payment: InvoicePaymentDto
  delivery: InvoiceDeliveryDto
  notes?: string
}

export interface InvoiceDetailsReceiptResponse {
  companyName: string
  companyMobile: string
  companyTin: string
  companyVrn: string
  companySerial: string
  companyTaxOffice: string
  receiptNumber: string
  receiptZNumber: string
  receiptDate: string
  receiptTime: string
  fiscalVerificationCode: string
  fiscalQrCode: string
}

export interface InvoiceDetailsResponse {
  status: string
  isOnline: boolean
  isFiscalized: boolean
  receipt: InvoiceDetailsReceiptResponse
}

export interface InvoiceResponse {
  responseCode: string
  message: string
  error: boolean
  documentId: string
  status: string
  details: InvoiceDetailsResponse
}

export interface InvoiceStatusResponse extends InvoiceRequest {
  status: string
  revenueAuthorityReference: string
  revenueAuthorityMessage: string
  responseCode: string
  message: string
  error: boolean
}

export interface InvoiceEventLogResponse {
  statusMessage: string
  statusCode: string
  dateTime: string
  revenueAuthorityReference: string
  revenueAuthorityMessage: string
}
