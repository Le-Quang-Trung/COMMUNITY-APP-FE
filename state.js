import { atom } from 'recoil';

export const userState = atom({
    key: 'userState', 
    default: {
        role: "", 
        data: {}, 
    },
});

export const userPHState = atom({
    key: 'userPHState',
    default: null,
})

export const sinhVienDataState = atom({
    key: 'sinhVienDataState',
    default: null,
}); 

export const giangVienDataState = atom({
    key: 'giangVienDataState',
    default: null,
})
