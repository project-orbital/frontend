import PageTemplate from "../../common/components/PageTemplate";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import Card from "../../common/components/Card";

export default function AccountNotFound() {
    return (
        <PageTemplate>
            <Breadcrumbs
                path="Home/Accounts/404"
                links={["/dashboard", "/accounts", `/accounts/not-found`]}
            />
            <Card
                isCentered
                heading="We couldn't find that account."
                subheading="Click here to view all your accounts."
                link="/accounts"
            />
        </PageTemplate>
    );
}
