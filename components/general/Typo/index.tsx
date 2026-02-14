'use client'

import { createContext } from "react";
import s from './style.module.scss';
import cs from 'classnames';

const TypoContext = createContext({});

function TypoMain(props: any) {
    return (
        <TypoContext.Provider value={props}>
            {props.children}
        </TypoContext.Provider>
    )
}

type ColorType = 'primary' | 'secondary' | 'inverted' | 'brand' | 'correct' | 'wrong' | 'background-secondary' | 'background-third' | 'border';
type FontWeightType = 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold';

interface TypoProps {
    children: React.ReactNode;
    className?: string;
    color?: ColorType;
    fontWeight?: FontWeightType;
}

const getTypoClass = (color?: ColorType, fontWeight?: FontWeightType) => {
    return cs(
        color && s[color],
        fontWeight && s[fontWeight]
    );
}

function XXS({ children, className, color, fontWeight }: TypoProps) {
    return (
        <p className={cs(className, getTypoClass(color, fontWeight))} style={{ fontSize: 10 }}>
            {children}
        </p>
    )
}

function XS({ children, className, color, fontWeight }: TypoProps) {
    return (
        <p className={cs(className, getTypoClass(color, fontWeight))} style={{ fontSize: 12 }}>
            {children}
        </p>
    )
}

function SM({ children, className, color, fontWeight }: TypoProps) {
    return (
        <p className={cs(className, getTypoClass(color, fontWeight))} style={{ fontSize: 14 }}>
            {children}
        </p>
    )
}

function MD({ children, className, color, fontWeight }: TypoProps) {
    return (
        <p className={cs(className, getTypoClass(color, fontWeight))} style={{ fontSize: 16 }}>
            {children}
        </p>
    )
}

function LG({ children, className, color, fontWeight }: TypoProps) {
    return (
        <p className={cs(className, getTypoClass(color, fontWeight))} style={{ fontSize: 20 }}>
            {children}
        </p>
    )
}

function XL({ children, className, color, fontWeight }: TypoProps) {
    return (
        <p className={cs(className, getTypoClass(color, fontWeight))} style={{ fontSize: 24 }}>
            {children}
        </p>
    )
}

function XXL({ children, className, color, fontWeight }: TypoProps) {
    return (
        <p className={cs(className, getTypoClass(color, fontWeight))} style={{ fontSize: 36 }}>
            {children}
        </p>
    )
}

const Typo = Object.assign(TypoMain, {
    XXS,
    XS,
    SM,
    MD,
    LG,
    XL,
    XXL,
})

export default Typo