'use-client'
import FormCard from "@/components/form/form-card";

export default function Group() {

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <FormCard
                title="Enter group name"
                placeholder="Enter group"
                //@ts-expect-error
                onSubmit={(e) => { console.log(e); e.preventDefault(); }}>
            </FormCard>
        </div>
    )
}