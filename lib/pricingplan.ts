export type PricingPlan = {
    level: string,
    price: string,
    services: string[]
}

const pricingPlan : PricingPlan[] = [
    {
        level: 'FREE',
        price: '₹ 0 / MONTH',
        services: [
            '3 Free Credits',
            'Basic Supports',
            'Limited Features',
            'Community Access'
        ]
    },
    {
        level: 'PRO',
        price: '₹ 49 / MONTH',
        services: [
            'Unlimited Credits',
            'Basic Supports',
            'Limited Features',
            'Community Access'
        ]
    },
    {
        level: 'ULTIMA',
        price: '₹ 99 / Month',
        services: [
            'Unlimited Credits',
            'Basic Supports',
            'Limited Features',
            'Community Access',
            'Monthly Updates'
        ]
    },
]

export default pricingPlan