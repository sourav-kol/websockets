'use-client'
import FormCard from "@/components/form/form-card";

export default function User() {

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <FormCard
                title="Enter User Name"
                placeholder="Enter your name"
                //@ts-expect-error
                onSubmit={(e) => { console.log(e); e.preventDefault(); }}>
            </FormCard>
        </div>
    )
}