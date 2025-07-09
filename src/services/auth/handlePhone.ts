export const formatPhoneNumber = (value: string): string => {
    if (!value) return "";
  
    // Remove todos os caracteres que não são dígitos
    const cleanedValue = value.replace(/\D/g, '');
  
    let formattedValue = '';
  
    // Aplica a máscara (XX) XXXXX-XXXX
    if (cleanedValue.length > 0) {
      formattedValue = '(' + cleanedValue.substring(0, 2);
    }
    if (cleanedValue.length >= 3) {
      formattedValue += ') ' + cleanedValue.substring(2, 7);
    }
    if (cleanedValue.length >= 8) {
      formattedValue += '-' + cleanedValue.substring(7, 11);
    }
  
    // Garante que não exceda o tamanho da máscara
    if (formattedValue.length > 15) { // (XX) XXXXX-XXXX tem 15 caracteres
        return formattedValue.substring(0, 15);
    }
  
    return formattedValue;
  };
  
  /**
   * Extrai apenas os dígitos de um número de telefone formatado.
   * @param formattedValue O valor formatado (string).
   * @returns Os dígitos puros (string).
   */
  export const getCleanPhoneNumber = (formattedValue: string): string => {
    return formattedValue.replace(/\D/g, '');
  };