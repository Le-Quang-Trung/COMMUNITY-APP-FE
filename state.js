import { atom } from 'recoil';

export const userState = atom({
    key: 'userState', 
    default: {
        role: "", 
        data: {}, 
    },
});

export const sinhVienDataState = atom({
    key: 'sinhVienDataState',
    default: null,
}); 
