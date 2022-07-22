import FormModal from "../../../common/components/form/FormModal";

export default function LiabilityCreate({ type }) {
    const title =
        type === "asset"
            ? "Adding your new asset..."
            : "Adding your new liability...";
    const heading = `We need some details about this ${type}.`;
    const subheading = `Please fill out the form below to add your ${type}.`;
    if (type === "asset") {
    }
    return (
        <FormModal
            title={title}
            heading={heading}
            subheading={subheading}
            cancelText={`Cancel ${type} creation`}
            submitText={`Add ${type}`}
            initialValues={{}}
        ></FormModal>
    );
}
