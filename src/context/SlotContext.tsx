import React, { createContext, FC, useCallback, useEffect, useState } from "react";

const createEmptySlots = (TOTAL_SPACES: number): Slot[] => {
    const cardata: Slot[] = Array(TOTAL_SPACES)
        .fill(0)
        .map((_, index) =>
            Object({
                carnumber: "",
                bookingid: index,
                available: true,
                cartiming: "",
            })
        );
    return cardata;
};

export interface Slot {
    carnumber: string;
    bookingid: number;
    available: boolean;
    cartiming: string | Date;
}

export interface SlotContextType {
    totalSlots: number;
    freeSlots: number;
    slots: Slot[];
    addToSlot: (carNumber: string, time: Date) => void;
    removeFromSlot: (bookingid: number) => void;
    createSlots: (slotCount: number) => void;
}

const SlotContext = createContext<SlotContextType>({
    totalSlots: 0,
    freeSlots: 0,
    slots: createEmptySlots(0),
    addToSlot: (carNumber: string, time: Date) => { },
    removeFromSlot: (bookingid: number) => { },
    createSlots: (slotCount: number) => { },
});


// create provider for context

interface SlotProviderProps {
    children: React.ReactNode;
}

export const SlotProvider: FC<SlotProviderProps> = (props) => {
    const [totalSlots, setTotalSlots] = useState(0);
    const [freeSlots, setFreeSlots] = useState(0);
    const [slots, setSlots] = useState<Slot[]>(createEmptySlots(0));

    // Return total free spaces

    const countFreeSlots = useCallback(() => {
        const freeSlots = slots.filter(slot => slot.available).length;
        setFreeSlots(freeSlots);
        return freeSlots;
    }, [slots]);

    // return a random free slots Id
    const getRandomId = () => Math.floor(Math.random() * countFreeSlots());

    // return free slot Id
    const getFreeSpaceId = () => {
        const freeSpace = slots.filter(
            (val) => val.available === true
        );
        return freeSpace[getRandomId()].bookingid;
    }

    const addToSlot = (carNumber: string, time: Date) => {
        let carDetails = {
            carnumber: carNumber,
            bookingid: getFreeSpaceId(),
            available: false,
            cartiming: time,
        };
        const newSlots = [...slots];
        newSlots[carDetails.bookingid] = carDetails;
        setSlots(newSlots);
    }

    const removeFromSlot = (bookingid: number) => {
        const newSlots = [...slots];
        const slot = newSlots[bookingid];
        slot.available = true;
        slot.carnumber = "";
        slot.cartiming = "";
        setSlots(newSlots);
    }

    const createSlots = (slotCount: number) => {
        setTotalSlots(slotCount);
        setSlots(createEmptySlots(slotCount));
    }

    useEffect(() => {
        countFreeSlots();
    }, [slots, countFreeSlots]);

    return (
        <SlotContext.Provider value={{
            totalSlots,
            freeSlots,
            slots,
            addToSlot,
            removeFromSlot,
            createSlots,
        }}>
            {props.children}
        </SlotContext.Provider>
    )
}

export default SlotContext;