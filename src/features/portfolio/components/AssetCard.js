import BaseCard from "../../../common/components/cards/BaseCard";
import NavButton from "../../../common/components/buttons/NavButton";
import { HStack, VStack } from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function AssetCard({ asset, orders }) {
    const Controls = () => (
        <HStack>
            <NavButton
                to={`./assets/${asset.id}/update`}
                variant="tertiary"
                leftIcon={<MdOutlineEdit size="18px" />}
            >
                Edit
            </NavButton>
            <NavButton
                to={`./assets/${asset.id}/delete`}
                variant="tertiary"
                leftIcon={<MdOutlineDelete size="20px" />}
            >
                Delete
            </NavButton>
        </HStack>
    );

    return (
        <BaseCard
            title={asset.name}
            subtitle={asset.symbol}
            button={<Controls />}
        >
            <VStack align="start" spacing={4}>
                <NavButton
                    to={`./assets/${asset.id}/orders/create/buy`}
                    variant="primary"
                    icon={<AiOutlinePlus />}
                >
                    Record a buy order
                </NavButton>
                <NavButton
                    to={`./assets/${asset.id}/orders/create/sell`}
                    variant="primary"
                    icon={<AiOutlineMinus />}
                >
                    Record a sell order
                </NavButton>
            </VStack>
        </BaseCard>
    );
}
