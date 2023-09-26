"use client";

import LoanRange from "@/components/LoanRange";
import SelectLoanRange from "@/components/SelectLoanRange";
import { Space } from "antd";
import Title from "antd/es/typography/Title";
import router from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoanHistory = ({ params }: { params: { loanId: string } }) => {
  const [fromDate, setFromDate] = useState<number | null>(null);
  const [toDate, setToDate] = useState<number | null>(null);
  const { loanId } = params;
  const router = useRouter();

  return (
    <>
      <Title>{`Loan ${loanId} History`}</Title>
      <Space size="middle">
        <a onClick={() => router.push(`/loans/${loanId}`)}>🗓️ Schedule</a>
        <a onClick={() => router.push(`/loans/${loanId}/history`)}>
          💰 Payment History
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/update`)}>
          ✏️ Update Loan
        </a>
      </Space>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Title level={4}>Select Start and End Date:</Title>
        <div style={{ marginLeft: "2%" }}>
          <SelectLoanRange setFromDate={setFromDate} setToDate={setToDate} />
        </div>
      </div>
      <LoanRange loanId={loanId} fromDate={fromDate} toDate={toDate} />
    </>
  );
};

export default LoanHistory;
