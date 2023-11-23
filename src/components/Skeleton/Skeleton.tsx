/*
 * Created on Thu Nov 23 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { Skeleton } from "@mui/material";
import { Column } from "../Column";

export default function FallbackSkeleton() {
  return (
    <Column
      gap={16}
      verticalAlign="center"
      horizonAlign="center"
      style={{ margin: "auto", width: "100%", height: "100vh" }}
    >
      <Skeleton animation="wave" variant="rounded" width={600} height={50} />
      <Skeleton animation="wave" variant="rounded" width={600} height={50} />
      <Skeleton animation="wave" variant="rounded" width={600} height={50} />
      <Skeleton animation="wave" variant="rounded" width={600} height={50} />
      <Skeleton animation="wave" variant="rounded" width={100} height={50} />
    </Column>
  );
}
