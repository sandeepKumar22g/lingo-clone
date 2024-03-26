import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type Props = {
    activeCourse: {imgSrc: string; title: string;}; //replace with DB types
    hearts: number;
    points: number
    hasActiveSubscription: boolean
}

export const UserProgress = ({ activeCourse, hasActiveSubscription, hearts, points }: Props) => {
    return (
        <div className="flex justify-center items-center gap-x-2 w-full">
            <Link href={"/courses"}>
                <Button variant={"ghost"}>
                    <Image src={activeCourse.imgSrc} alt={activeCourse.title} className="rounded-md border" width={32} height={32} />
                </Button>
            </Link>
            <Link href={"/shop"}>
                <Button variant={"ghost"} className="text-orange-500">
                    <Image src={"/points.svg"} alt="Points" className="mr-2" height={28} width={28} />
                    {points}
                </Button>
            </Link>
            <Link href={"/shop"}>
                <Button variant={"ghost"} className="text-rose-500">
                    <Image src={"/heart.svg"} alt="Hearts" className="mr-2" height={28} width={28} />
                    {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> :  hearts}
                </Button>
            </Link>
        </div>
    )
}
