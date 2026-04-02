
export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
}

export interface TableAction {
    label: string;
    type: 'edit' | 'delete' | 'custom';
    class?: string;
}
