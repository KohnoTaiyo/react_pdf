import { FC, useEffect, useState } from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import fontRegular from "../../public/fonts/NotoSansJP-Regular.otf";
import fontBold from "../../public/fonts/NotoSansJP-Regular.otf";

type PdfPageProps = {
  lastName: string;
  firstName: string;
  jobSummary: string;
};

const PdfPage: FC<PdfPageProps> = (props) => {
  Font.register({
    family: "NotoSansJP",
    fonts: [
      {
        src: fontRegular,
      },
      { src: fontBold, fontWeight: "bold" },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      padding: 8,
    },
    main: {
      fontFamily: "NotoSansJP",
      fontWeight: "bold",
      textAlign: "center",
    },
    title: {
      fontFamily: "NotoSansJP",
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "8px",
    },
    name: {
      fontFamily: "NotoSansJP",
      textAlign: "right",
      fontSize: "10px",
      marginBottom: "8px",
    },
    text: {
      fontFamily: "NotoSansJP",
      fontSize: "12px",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.main}>職務経歴書</Text>
        <Text
          style={styles.name}
        >{`氏名　${props.lastName} ${props.firstName}`}</Text>
        <Text style={styles.title}>■職務要約</Text>
        <Text style={styles.text}>{props.jobSummary}</Text>
      </Page>
    </Document>
  );
};

export default function Home() {
  const [isRendering, setIsRendering] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [jobSummary, setJobSummary] = useState("");

  useEffect(() => {
    setIsRendering(true);
  }, []);

  return (
    <>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="名字"
      />
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="名前"
      />
      <textarea
        placeholder="職務要約"
        value={jobSummary}
        onChange={(e) => setJobSummary(e.target.value)}
      />
      {isRendering && (
        <PDFDownloadLink
          document={
            <PdfPage
              lastName={firstName}
              firstName={lastName}
              jobSummary={jobSummary}
            />
          }
          fileName="test.pdf"
        >
          <button>ダウンロード</button>
        </PDFDownloadLink>
      )}
    </>
  );
}
