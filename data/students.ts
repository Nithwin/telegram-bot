export interface Student {
  regNo: string;
  name: string;
}

// TODO: User should populate this list with actual student data
export const ALL_STUDENTS: Student[] = [
  { regNo: 'REG001', name: 'Alice Smith' },
  { regNo: 'REG002', name: 'Bob Johnson' },
  { regNo: 'REG003', name: 'Charlie Brown' },
];
