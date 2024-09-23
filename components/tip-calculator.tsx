"use client";

import { useState } from "react";
import { DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export function TipCalculatorComponent() {
    const [bill, setBill] = useState("");
    const [tipPercentage, setTipPercentage] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("1");

    const tipPercentages = [5, 10, 15, 25, 50];

    const calculateTip = () => {
        const billAmount = parseFloat(bill);
        const tipPercent = parseFloat(tipPercentage);
        const people = parseInt(numberOfPeople);

        if (isNaN(billAmount) || isNaN(people) || people === 0) {
            return { preTipAmount: "0.00", tipAmount: "0.00", total: "0.00" };
        }

        const preTipAmount = billAmount / people;
        const tipAmount = isNaN(tipPercent)
            ? 0
            : (billAmount * (tipPercent / 100)) / people;
        const totalPerPerson = preTipAmount + tipAmount;

        return {
            preTipAmount: preTipAmount.toFixed(2),
            tipAmount: tipAmount.toFixed(2),
            total: totalPerPerson.toFixed(2),
        };
    };

    const { preTipAmount, tipAmount, total } = calculateTip();

    const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBill(e.target.value);
    };

    const handleTipPercentageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTipPercentage(e.target.value);
    };

    const handleNumberOfPeopleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNumberOfPeople(e.target.value);
    };

    const handleReset = () => {
        setBill("");
        setTipPercentage("");
        setNumberOfPeople("1");
    };

    return (
        <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
            <h1
                className={`text-6xl font-black text-green-800 text-center mb-6 ${fredoka.className}`}>
                TipTop
            </h1>
            <p className=" text-green-800 text-center mb-6 font-bold">
                Split your bill with TipTop!
            </p>
            <Card className="w-full max-w-4xl">
                <CardContent className="grid md:grid-cols-2 gap-8 p-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="bill">Bill</Label>
                            <div className="relative">
                                <DollarSign
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <Input
                                    id="bill"
                                    type="number"
                                    value={bill}
                                    onChange={handleBillChange}
                                    className="pl-10"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Select Tip %</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {tipPercentages.map((percent) => (
                                    <Button
                                        key={percent}
                                        onClick={() =>
                                            setTipPercentage(percent.toString())
                                        }
                                        variant={
                                            tipPercentage === percent.toString()
                                                ? "default"
                                                : "secondary"
                                        }
                                        className={
                                            tipPercentage === percent.toString()
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "bg-green-200 text-green-800 hover:bg-green-300"
                                        }>
                                        {percent}%
                                    </Button>
                                ))}
                                <Input
                                    type="number"
                                    value={tipPercentage}
                                    onChange={handleTipPercentageChange}
                                    placeholder="Custom"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="people">Number of People</Label>
                            <div className="relative">
                                <Users
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <Input
                                    id="people"
                                    type="number"
                                    value={numberOfPeople}
                                    onChange={handleNumberOfPeopleChange}
                                    className="pl-10"
                                    placeholder="1"
                                />
                            </div>
                        </div>
                    </div>

                    <Card className="bg-green-800 text-white">
                        <CardContent className="p-6 space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-white">Pre-Tip</p>
                                    <p className="text-green-300 text-sm">
                                        / person
                                    </p>
                                </div>
                                <p className="text-green-400 text-4xl font-bold">
                                    ${preTipAmount}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-white">Tip Amount</p>
                                    <p className="text-green-300 text-sm">
                                        / person
                                    </p>
                                </div>
                                <p className="text-green-400 text-4xl font-bold">
                                    ${tipAmount}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-white">Total</p>
                                    <p className="text-green-300 text-sm">
                                        / person
                                    </p>
                                </div>
                                <p className="text-green-400 text-4xl font-bold">
                                    ${total}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="p-6">
                            <Button
                                onClick={handleReset}
                                className="w-full bg-green-500 text-green-900 hover:bg-green-400">
                                RESET
                            </Button>
                        </CardFooter>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
