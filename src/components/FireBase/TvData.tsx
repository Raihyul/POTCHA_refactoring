import { setDoc, doc } from "firebase/firestore";
import { usePapaParse } from "react-papaparse";
import { db } from "../../server/fireconfig";

function TvData() {
  const { readRemoteFile } = usePapaParse();
  const addData = async () => {
    try {
      readRemoteFile("/tv_db_total_final.csv", {
        download: true,
        header: true,
        complete: (data: any) => {
          data.data.map(async (eachData: any) => {
            for (const [key, value] of Object.entries(eachData)) {
              let val: string = value as string;
              if (val[0] === "[") {
                val = val.slice(1, -1);
                const newData: string[] = val
                  .replaceAll("'", "")
                  .replaceAll('"', "")
                  .split(",")
                  .map((a) => a.trim());
                eachData[key] = newData;
              }
            }
            const docRef2 = doc(db, "tv", eachData.id);
            await setDoc(docRef2, {
              ...eachData,
              id: parseInt(eachData.id),
              popularity: parseFloat(eachData.popularity),
              rank: parseInt(eachData.rank),
              runtime: eachData.runtime.map((b: string) => parseInt(b)),
            });
          });
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    alert("end");
  };
  return <button onClick={addData}>add firebase</button>;
}

export default TvData;
