import { vnp_ReturnUrl, vnp_Url } from "@/constant/payment";
import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import querystring from "qs";
import { redirect } from "next/navigation";
import { decodeReadableStream } from "@/lib/utils";
import { NextResponse } from "next/server";

function sortObject(obj: { [x: string]: any }) {
  let sorted: { [key: string]: string } = {};
  let str: string[] = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const requestData = await decodeReadableStream(req.body);

  const ipAddr =
    req.headers["x-forwarded-for"]?.[0] ||
    req.socket?.remoteAddress ||
    "127.0.0.1";

  const tmnCode = process.env.VNPAY_TMNCODE;
  const secretKey = process.env.VNPAY_HASHSECRET;
  let vnpUrl = vnp_Url;
  const returnUrl = vnp_ReturnUrl;

  const date = new Date();

  const createDate = dayjs(date).format("yyyymmddHHmmss");
  const orderId = dayjs(date).format("HHmmss");
  const amount = Number(requestData.amount);
  const bankCode = requestData.bankCode;

  const orderInfo = requestData.orderDescription;
  const orderType = requestData.orderType;
  const locale = requestData.language ?? "vn";

  const currCode = "VND";
  let vnp_Params: { [x: string]: string | number | string[] } = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  return NextResponse.json({ data: vnpUrl, statusCode: 200 });
}
