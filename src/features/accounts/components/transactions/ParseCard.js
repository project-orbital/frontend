import NavButton from "../../../../common/components/buttons/NavButton";
import BaseCard from "../../../../common/components/cards/BaseCard";

export default function ParseCard() {
    return (
        <BaseCard
            heading="Don't want to do manual data entry?"
            subheading="Let our document parser extract your transactions from a
                    bank statement."
        >
            <NavButton
                to="./upload/disclaimer"
                text="Parse documents"
                withArrow
            />
        </BaseCard>
    );
}
