export interface BookTransaction {
    id: number;
    bookId: number;
    userId: number;
    bookTitle: string;
    userName: string;
    transactionType: string;
    transactionDate: string;  
    dueDate: string | null;   
    returnedDate: string | null;
    isOverdue: boolean;
}
