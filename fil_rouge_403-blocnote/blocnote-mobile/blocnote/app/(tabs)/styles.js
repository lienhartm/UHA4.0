import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  charCount: {
    marginTop: 10,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  documentItem: {
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    margin: "auto",
    padding: 5,
    width: 800,
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#F0F8FF",
    height: 50,
    marginTop: 100,
    paddingTop: 15,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#F0F8FF",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  menuIcon: {
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 2,
    fontSize: 42,
    margin: 40,
    marginTop: 60,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  note: {
    fontSize: 24,
    paddingRight: 200,
  },
  noteClose: {
    backgroundColor: "#F0F8FF",
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    margin: "auto",
    marginTop: 20,
    padding: 20,
    textAlign: "center",
  },
  noteContenu: {
    paddingLeft: 40,
    width: 100,
  },
  noteDisplay: {
    borderColor: "#000",
    borderRadius: 20,
    borderWidth: 2,
    flex: 1,
    flexDirection: "column",
    margin: "auto",
    marginTop: 60,
    padding: 20,
    width: 1000,
  },
  noteDisplayContenu: {
    margin: 20,
  },
  noteDisplayStatus: {
    margin: 20,
  },
  noteDisplayTitre: {
    fontSize: 24,
    marginBottom: 20,
    marginLeft: 20,
    textAlign: "center",
  },
  noteSection: {
    marginBottom: 20,
  },
  noteStatus: {
    paddingLeft: 40,
    width: 200,
  },
  noteTitle: {
    fontSize: 12,
    marginBottom: 10,
    padding: 10,
    width: 200,
  },
  statusSelector: {
    backgroundColor: "#F0F8FF",
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 40,
    padding: 20,
  },
  stockSpan: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textArea: {
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    verticalAlign: "top",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 40,
    marginTop: 60,
  },
  titleDocument: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    margin: "auto",
  },
  titleSpan: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 60,
  },
});

export default styles;
