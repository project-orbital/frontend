import { RiArrowRightSLine } from "react-icons/ri";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 * A dynamically-generated breadcrumb trail.
 *
 * Breadcrumbs are generated from a single string, which is split into individual crumbs
 * as delimited by "/".
 *
 * These crumbs must be accompanied by an array of URLs, which are used to generate the
 * links in the breadcrumb trail.
 *
 * A boldface header is rendered below the breadcrumb trail, which is used to display
 * the current page title, which if not provided, is derived from the last crumb.
 *
 * @param path a string containing the path to be displayed, delimited by "/"
 * @param links an array of strings containing the URLs
 * @param title an optional string containing the title of the current page
 * @return the breadcrumb trail element
 */
export default function Breadcrumbs({ path, links, title }) {
    const crumbs = path.split("/");
    return (
        <Box>
            <Breadcrumb spacing="2px" separator={<RiArrowRightSLine />}>
                {crumbs.map((crumb, index) => (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink as={Link} to={links[index]}>
                            {crumb}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Box>
    );
}
