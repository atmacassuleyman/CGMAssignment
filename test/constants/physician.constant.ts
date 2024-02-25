const peterWunderlich: Physician = {
        name: 'Peter',
        lastName: 'Wunderlich',
        address: 'Teststraße 3, 12345 Testhausen'
    }

interface Physician {
    name: string;
    lastName: string;
    address: string;
}
export {
    peterWunderlich
};

export type { Physician };

