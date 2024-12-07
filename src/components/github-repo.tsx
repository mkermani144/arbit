import { Github } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const GithubRepo = () => (
  <Button variant="outline" size="icon" asChild>
    <Link href="https://github.com/connecment/arbit" target="_blank">
      <Github />
    </Link>
  </Button>
);

export default GithubRepo;
