import { chatGroup } from "@/types";

type Prop = {
    data: chatGroup | null
}

export default function ChatGroupDetail(props: Prop) {
    const { data } = props;
    return (
        data &&
        <div className="">
            {data.title}
        </div>
    );
}
