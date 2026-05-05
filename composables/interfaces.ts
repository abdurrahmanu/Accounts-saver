export interface collectionForm {
  name: string,
  selectedAccounts: object
}

export interface collection {
  name: string,
  accounts: Account[]
  id: string
}

export interface Account {
  id: string
  name: string
  nickname: string
  bank: string
  accountNumber: string
  selected: boolean
  favourite: boolean
  phoneNumber: string
  collection: string
  collections?: []
}